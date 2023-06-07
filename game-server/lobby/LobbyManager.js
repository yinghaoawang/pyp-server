const { v4: uuidv4 } = require('uuid');

const Lobby = require('./Lobby');

const lobbies = new Map();

class LobbyManager {
  createLobby(user) {
    const lobbyId = uuidv4();
    const lobby = new Lobby(lobbyId);
    if (lobbies.get(lobbyId) != null) {
      console.error('Lobby ID is not unique');
      return;
    }
    lobby.addUser(user);
    lobbies.set(lobbyId, lobby);

    console.log(`Lobby ${lobbyId} created with host ${user.id}`);

    return lobby;
  }

  removeLobby(lobbyId, userId) {
    const lobby = lobbies.get(lobbyId);
    if (lobby == null) {
      console.error('Lobby does not exist');
      return;
    }

    const hostId = lobby.getHostId();
    const isHost = userId === hostId;
    if (!isHost || hostId == null) {
      console.log(userId, hostId);
      console.error('User is not the host, cannot remove lobby');
      return;
    }

    lobbies.delete(lobbyId);
    console.log(`Lobby ${lobbyId} removed`);
  }

  isUserInLobby(lobbyId, userId) {
    const lobby = lobbies.get(lobbyId);
    if (lobby == null) {
      console.error('Lobby does not exist');
      return;
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
    const lobby = lobbies.get(lobbyId);
    if (lobby == null) {
      console.error('Lobby does not exist');
      return;
    }

    lobby.addUser(user);
  }

  leaveLobby(lobbyId, user) {
    const lobby = lobbies.get(lobbyId);
    if (lobby == null) {
      console.error('Lobby does not exist');
      return;
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
