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
    lobby.addUser(user);
    lobbies.set(lobbyId, lobby);

    console.log(`Lobby ${lobbyId} created with host ${user.id}`);

    return lobby;
  }

  removeLobby(lobbyId, userId) {
    const lobby = lobbies.get(lobbyId);
    if (lobby == null) {
      throw new Error('Lobby does not exist');
    }

    const hostId = lobby.getHostId();
    const isHost = userId === hostId;
    if (!isHost || hostId == null) {
      throw new Error('User is not the host, cannot remove lobby');
    }

    lobbies.delete(lobbyId);
    console.log(`Lobby ${lobbyId} removed`);
  }

  isUserInLobby(lobbyId, userId) {
    const lobby = lobbies.get(lobbyId);
    if (lobby == null) {
      throw new Error('Lobby does not exist');
    }
    return lobby.getUser(userId) != null;
  }

  findUsersLobby(userId) {
    for (const [lobbyId, lobby] of lobbies.entries()) {
      if (this.isUserInLobby(lobbyId, userId)) return lobby;
    }

    console.log('User not in any lobby');
    return null;
  }

  isUserInAnyLobby(userId) {
    return this.findUsersLobby(userId) != null;
  }

  getLobby(lobbyId) {
    return lobbies.get(lobbyId);
  }

  getLobbies() {
    return lobbies;
  }

  joinLobby(lobbyId, user) {
    if (this.isUserInAnyLobby(user.id)) {
      throw new Error('User');
    }

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
