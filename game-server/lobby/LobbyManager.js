const { 
  v4: uuidv4,
} = require('uuid');

const Lobby = require('./Lobby');

const lobbies = new Map();

module.exports = {
  createLobby: (users = []) => {
    const lobbyId = uuidv4();
    const lobby = new Lobby(lobbyId);
    if (lobbies.get(lobbyId) != null) {
      throw new Error('Lobby ID is not unique');
    } 
    lobbies.set(lobbyId, lobby);
    lobby.addUsers(users);

    return lobby;
  },

  getLobby: (lobbyId) => {
    return lobbies.get(lobbyId);
  },

  getLobbies: () => {
    return lobbies;
  },

  joinLobby: (lobbyId, user) => {
    const lobby = lobbies.get(lobbyId);
    if (lobby == null) {
      throw new Error('Lobby does not exist');
    }

    lobby.addUser(user);
  },

  leaveLobby: (lobbyId, user) => {
    const lobby = lobbies.get(lobbyId);
    if (lobby == null) {
      throw new Error('Lobby does not exist');
    }
    lobby.removeUser(user.id);
  },

  getAvailableLobbies: () => {
    return Array.from(lobbies.keys());
  }
};
