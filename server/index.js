const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;

// Servir os arquivos do frontend
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = new Server(server);

// Aqui você pode conectar o socket.io com a lógica do jogo
// Exemplo:
io.on('connection', (socket) => {
  console.log('Novo jogador conectado');
  // ... restante da lógica
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
