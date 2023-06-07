const { getAvailableLobbies, createLobby, joinLobby } = require('./LobbyManager');

module.exports = {
  addListeners: (io, socket) => {
    function getUser() {
      return { id: socket.id };
    }

    socket.emit('getLobbies', {
      lobbies: getAvailableLobbies()
    });

    socket.on('createLobby', () => {
      const lobby = createLobby([getUser()]);
      socket.emit('getLobbies', {
        lobbies: getAvailableLobbies()
      });

      joinLobby(lobby.id , getUser());
      socket.emit('joinLobby', { lobbyId: lobby.id });
    });

    socket.on('joinLobby', (payload) => {
      const { lobbyId } = payload;

      joinLobby(lobbyId, getUser());
      socket.emit('joinLobby', { lobbyId: lobby.id });
    });
  }
};
