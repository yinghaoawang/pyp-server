class Lobby {
  constructor(id) {
    this.id = id;
    this.users = new Map();
  }
  addUser(user) {
    if (user == null) {
      throw new Error('User does not exist');
    }
    if (user.id == null) {
      throw new Error('User does not have an ID');
    }
    this.users.set(user.id, user);
  }
  addUsers(users) {
    if (!Array.isArray(users)) {
      throw new Error('Users array expected, not found');
    }
    for (const user of users) {
      this.addUser(user);
    }
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
      throw new Error('User could not be found');
    }
    this.users.delete(userId);
  }
}

module.exports = Lobby;
