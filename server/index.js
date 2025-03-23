const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir os arquivos estáticos da build do React
app.use(express.static(path.join(__dirname, 'public')));

// Socket.IO - lógica básica de jogo
io.on('connection', (socket) => {
  console.log('🟢 Novo jogador conectado');

  // Exemplo: emitir número de dado
  socket.on('jogar_dado', () => {
    const numero = Math.floor(Math.random() * 6) + 1;
    socket.emit('dado', numero);
    socket.emit('mensagem', `Você tirou ${numero}`);
  });

  socket.on('disconnect', () => {
    console.log('🔴 Jogador desconectado');
  });
});

// ESSENCIAL: garantir que todas as rotas apontem pro React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Porta compatível com Render (e localmente)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
