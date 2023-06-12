const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*'
  }
});

const socketHandler = require('./socket/socketHandler');
socketHandler.addListeners(io);

// Start the server and listen on a specific port
const PORT = process.env.PORT || 9898;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
