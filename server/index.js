const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Lógica do socket.io
io.on('connection', (socket) => {
  console.log('Um jogador entrou');
  // ...
});

// 🔥 ESSENCIAL PARA RENDER:
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
