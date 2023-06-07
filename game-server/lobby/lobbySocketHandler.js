const lobbyManager = require('./LobbyManager');

module.exports = {
  addListeners: (io, socket) => {
    // Helpers
    function getUser() {
      return { id: socket.id };
    }

    function emitGetLobbies(nsp) {
      nsp.emit('getLobbies', {
        lobbies: lobbyManager.getAvailableLobbies()
      });
    }

    // On add listener    
    emitGetLobbies(socket);

    // Listeners
    socket.on('createLobby', () => {
      if (lobbyManager.isUserInAnyLobby(getUser().id)) {
        const errorMessage = 'Cannot create lobby, user is already in one';
        socket.emit('error', { message: errorMessage });
        console.error(errorMessage);
        return;
      }

      const lobby = lobbyManager.createLobby(getUser());
      emitGetLobbies(socket);
      socket.emit('joinLobby', { lobbyId: lobby.id });
    });

    socket.on('joinLobby', (payload) => {
      if (lobbyManager.isUserInAnyLobby(getUser().id)) {
        const errorMessage = 'Cannot join lobby, user is already in one';
        socket.emit('error', { message: errorMessage });
        console.error(errorMessage);
        return;
      }

      const { lobbyId } = payload;

      lobbyManager.joinLobby(lobbyId, getUser());
      socket.emit('joinLobby', { lobbyId: lobby.id });
    });

    /** Remove the user's current lobby */
    socket.on('removeLobby', (payload) => {
      const lobby = lobbyManager.findUsersLobby(getUser().id);
      if (lobby == null) {
        console.error('User not in a lobby, could not remove');
        return;
      }

      lobbyManager.removeLobby(lobby.id, getUser().id);
      emitGetLobbies(socket);
    })
  }
};
