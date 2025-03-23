import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Tabuleiro from './components/Tabuleiro';
import Dados from './components/Dados';

const socket = io();

function App() {
  const [mensagem, setMensagem] = useState('');
  const [dado, setDado] = useState(1);

  useEffect(() => {
    socket.on('mensagem', (msg) => {
      setMensagem(msg);
    });

    socket.on('dado', (numero) => {
      setDado(numero);
    });
  }, []);

  const rolarDados = () => {
    socket.emit('jogar_dado');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Monopoly RJ 🎲</h1>
      <Tabuleiro />
      <Dados valor={dado} />
      <button onClick={rolarDados}>Jogar Dado</button>
      <p>{mensagem}</p>
    </div>
  );
}

export default App;
