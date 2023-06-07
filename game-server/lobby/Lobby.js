class Lobby {
  constructor(id) {
    this.id = id;
    this.users = new Map();
    this.hostId;
  }

  getHostId() {
    return this.hostId;
  }

  getHost() {
    if (hostId == null) {
      console.error('HostID is null');
      return;
    }

    const host = this.users.get(hostId);
    if (host == null) {
      console.error("Host not found in lobby's users");
      return;
    }

    return host;
  }

  setHost(hostId) {
    this.hostId = hostId;
  }

  addUser(user) {
    if (user == null) {
      console.error('User does not exist');
      return;
    }
    if (user.id == null) {
      console.error('User does not have an ID');
      return;
    }

    if (this.users.size === 0) {
      this.setHost(user.id);
    }
    this.users.set(user.id, user);
  }

  getUsers() {
    return this.users;
  }

  getUser(userId) {
    return this.users.get(userId);
  }

  removeUser(userId) {
    const user = this.users.get(userId);
    if (user == null) {
      console.error('User could not be found');
      return;
    }
    this.users.delete(userId);
  }
}

module.exports = Lobby;
