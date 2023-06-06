const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server and listen on a specific port
const PORT = process.env.PORT || 9898;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
