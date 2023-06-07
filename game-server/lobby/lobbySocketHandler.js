const lobbyManager = require('./LobbyManager');

module.exports = {
  addListeners: (io, socket) => {
    function getUser() {
      return { id: socket.id };
    }

    socket.emit('getLobbies', {
      lobbies: lobbyManager.getAvailableLobbies()
    });

    socket.on('createLobby', () => {
      if (lobbyManager.isUserInAnyLobby(getUser().id)) {
        const errorMessage = 'Cannot create lobby, user is already in one';
        socket.emit('error', { message: errorMessage });
        console.error(errorMessage);
        return;
      }

      const lobby = lobbyManager.createLobby(getUser());
      socket.emit('getLobbies', {
        lobbies: lobbyManager.getAvailableLobbies()
      });
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
  }
};
