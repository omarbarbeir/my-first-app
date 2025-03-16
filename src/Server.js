// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Match frontend port
    methods: ["GET", "POST"]
  }
});

// Game state
const gameState = {
  disabledAnswers: new Set()
};

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Send initial state
  socket.emit('initialState', Array.from(gameState.disabledAnswers));

  // Handle answer submissions
  socket.on('disableAnswer', (answerId) => {
    if (!gameState.disabledAnswers.has(answerId)) {
      gameState.disabledAnswers.add(answerId);
      io.emit('answerDisabled', answerId);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(3001, '0.0.0.0', () => {
  console.log('Backend running on port 3001');
});