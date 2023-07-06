const adjectives = ['Small', 'Blue', 'Ugly'];
const names = ['Bear', 'Dog', 'Banana'];

module.exports = {
  generateName: () => {
    const rA = Math.floor(Math.random() * adjectives.length);
    const rB = Math.floor(Math.random() * names.length);
    return adjectives[rA] + names[rB];
  },

  generateLobbyName: () => {
    const lobbyNames = [
      'Room',
      'Place',
      'Chamber',
      'Accomodation',
      'Cabin',
      'Cave',
      'Den'
    ];

    const rA = Math.floor(Math.random() * adjectives.length);
    const rB = Math.floor(Math.random() * lobbyNames.length);
    return adjectives[rA] + lobbyNames[rB];
  }
};
