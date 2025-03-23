const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app); // <- esta linha é ESSENCIAL
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

// Lógica de jogo importada
const game = require('./game');

io.on('connection', (socket) => {
  console.log('🟢 Novo jogador conectado');

  socket.on('jogar_dado', () => {
    const numero = Math.floor(Math.random() * 6) + 1;
    socket.emit('dado', numero);
    socket.emit('mensagem', `Você tirou ${numero}`);

    const ia = game.jogarIA(numero);
    socket.emit('mensagem', ia);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Jogador saiu');
  });
});

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Porta obrigatória para Render funcionar
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
