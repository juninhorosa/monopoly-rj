import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

function App() {
  const [mensagem, setMensagem] = useState('');
  const [dado, setDado] = useState(1);

  useEffect(() => {
    socket.on('mensagem', (msg) => {
      const texto = typeof msg === 'string' ? msg : JSON.stringify(msg);
      setMensagem(texto);
    });

    socket.on('dado', (numero) => {
      setDado(numero);
    });
  }, []);

  const rolarDados = () => {
    socket.emit('jogar_dado');
  };

  return (
    <div style={{ textAlign: 'center', padding: 40 }}>
      <h1>Monopoly RJ 🎲</h1>
      <p style={{ fontSize: '2rem' }}>🎲 Dado: {dado}</p>
      <button onClick={rolarDados}>Jogar Dado</button>
      <p style={{ marginTop: 20 }}>{mensagem}</p>
    </div>
  );
}

export default App;
