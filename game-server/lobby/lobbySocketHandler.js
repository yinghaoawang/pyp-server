const lobbyManager = require('./LobbyManager');

module.exports = {
  addListeners: (io, socket) => {
    // Helper functions
    function getUser() {
      return { id: socket.id };
    }

    function emitGetLobbies(nsp) {
      nsp.emit('getLobbies', {
        lobbies: lobbyManager.getAvailableLobbies()
      });
    }

    function emitError(nsp, error) {
      if (error == null) {
        console.error('Error is null');
        return;
      }

      if (error.message == null) {
        console.error('Error has no message');
        return;
      }

      console.error('Emitted error: ', error.message);
      nsp.emit('error', { message: error.message });
    }

    function emitMessage(nsp, message) {
      nsp.emit('message', { message });
    }

    // on socket connection
    emitGetLobbies(socket);

    // Listeners
    socket.on('createLobby', () => {
      try {
        if (lobbyManager.isUserInAnyLobby(getUser().id)) {
          throw new Error('Cannot create lobby, user is already in one');
        }

        const lobby = lobbyManager.createLobby(getUser());
        emitGetLobbies(socket);
        socket.emit('joinLobby', { lobbyId: lobby.id });
      } catch (error) {
        emitError(socket, error);
      }
    });

    socket.on('joinLobby', (payload) => {
      try {
        if (lobbyManager.isUserInAnyLobby(getUser().id)) {
          throw new Error('Cannot join lobby, user is already in one');
        }

        const { lobbyId } = payload;

        lobbyManager.joinLobby(lobbyId, getUser());
        socket.emit('joinLobby', { lobbyId: lobbyId });
      } catch (error) {
        emitError(socket, error);
      }
    });

    /** Remove the user's current lobby */
    socket.on('removeLobby', (payload) => {
      try {
        const lobby = lobbyManager.findUsersLobby(getUser().id);
        if (lobby == null) {
          throw new Error('User not in a lobby, could not remove');
        }

        lobbyManager.removeLobby(lobby.id, getUser().id);
        emitGetLobbies(socket);
      } catch (error) {
        emitError(socket, error);
      }
    });

    socket.on('getLobbies', () => {
      emitGetLobbies(socket);
    });
  }
};
