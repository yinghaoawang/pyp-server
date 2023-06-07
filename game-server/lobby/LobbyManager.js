const { v4: uuidv4 } = require('uuid');

const Lobby = require('./Lobby');

const lobbies = new Map();

class LobbyManager {
  createLobby(user) {
    const lobbyId = uuidv4();
    const lobby = new Lobby(lobbyId);
    if (lobbies.get(lobbyId) != null) {
      throw new Error('Lobby ID is not unique');
    }
    lobbies.set(lobbyId, lobby);
    lobby.addUser(user);

    return lobby;
  }

  isUserInLobby(lobbyId, userId) {
    const lobby = lobbies.get(lobbyId);
    if (lobby == null) {
      throw new Error('Lobby does not exist');
    }
    return lobby.getUser(userId) != null;
  }

  isUserInAnyLobby(userId) {
    for (const [key, value] of lobbies.entries()) {
      const lobbyId = key;
      console.log(`checking if ${userId} is in ${lobbyId}`);
      if (this.isUserInLobby(lobbyId, userId)) return true;
    }
    return false;
  }

  getLobby(lobbyId) {
    return lobbies.get(lobbyId);
  }

  getLobbies() {
    return lobbies;
  }

  joinLobby(lobbyId, user) {
    const lobby = lobbies.get(lobbyId);
    if (lobby == null) {
      throw new Error('Lobby does not exist');
    }

    lobby.addUser(user);
  }

  leaveLobby(lobbyId, user) {
    const lobby = lobbies.get(lobbyId);
    if (lobby == null) {
      throw new Error('Lobby does not exist');
    }
    lobby.removeUser(user.id);
  }

  getAvailableLobbies() {
    return Array.from(lobbies.keys());
  }
}

/** Singleton instance the lobby manager class */
const instance = new LobbyManager();

module.exports = instance;