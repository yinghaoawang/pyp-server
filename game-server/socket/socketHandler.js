const { generateName } = require('../helpers');
const lobbySocketHandler = require('../lobby/lobbySocketHandler');

module.exports = {
  addListeners: (io) => {
    io.on('connection', (socket) => {
      console.log('New client connected');

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });

      socket.on('login', (payload) => {
        // TODO: add non hardcode feature
        onLoginSuccess();
      });

      const onLoginSuccess = () => {
        socket.username = generateName();
        socket.emit('loginSuccess', {
          user: { id: socket.id, username: socket.username }
        });
        lobbySocketHandler.addListeners(io, socket);
      };
    });
  }
};
