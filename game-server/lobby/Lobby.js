class Lobby {
  constructor(lobbyData, host) {
    this.id = lobbyData.id;
    this.name = lobbyData.name || 'No Name';
    this.usersMap = new Map();
    this.users = [];
    this.addUser(host);
  }

  getHostId() {
    return this.host.id;
  }

  getHost() {
    if (this.host == null) {
      console.error('Host not found');
      return;
    }

    return this.host;
  }

  setHost(host) {
    this.host = host;
  }

  updateUsersArray() {
    this.users = Array.from(this.usersMap.values());
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

    console.log('adding user hello');

    if (this.usersMap.size === 0) {
      this.setHost(user);
    }
    this.usersMap.set(user.id, user);
    this.updateUsersArray();
  }

  getUsers() {
    this.updateUsersArray();
    return this.users;
  }

  getUser(userId) {
    this.updateUsersArray();
    return this.usersMap.get(userId);
  }

  removeUser(userId) {
    const user = this.usersMap.get(userId);
    if (user == null) {
      console.error('User could not be found');
      return;
    }
    this.usersMap.delete(userId);
    this.updateUsersArray();
  }
}

module.exports = Lobby;
