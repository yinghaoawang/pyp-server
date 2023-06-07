const lobbySocketHandler = require('../lobby/lobbySocketHandler')

module.exports = {
  addListeners: (io) => {
    io.on('connection', (socket) => {
      console.log('New client connected');
  
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });

      lobbySocketHandler.addListeners(io, socket);
    });
  }
};
