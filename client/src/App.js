import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Tabuleiro from './components/Tabuleiro';
import somDado from './sounds/dice.mp3';
import somComprar from './sounds/comprar.mp3';
import somPrisao from './sounds/prisao.mp3';

const socket = io();

function App() {
  const [dado, setDado] = useState(1);
  const [mensagem, setMensagem] = useState('');

  const audioDado = new Audio(somDado);
  const audioComprar = new Audio(somComprar);
  const audioPrisao = new Audio(somPrisao);

  useEffect(() => {
    socket.on('dado', (valor) => {
      setDado(valor);
    });

    socket.on('mensagem', (msg) => {
      const texto = typeof msg === 'string' ? msg : JSON.stringify(msg);
      setMensagem(texto);

      if (texto.includes('comprou')) audioComprar.play();
      if (texto.includes('prisão')) audioPrisao.play();
    });
  }, []);

  const jogarDado = () => {
    audioDado.play();
    socket.emit('jogar_dado');
  };

  return (
    <div style={{ textAlign: 'center', padding: 20 }}>
      <h1>Monopoly RJ 🎲</h1>
      <Tabuleiro />
      <div style={{ fontSize: '2rem', margin: '20px 0' }}>🎲 {dado}</div>
      <button onClick={jogarDado}>Jogar Dado</button>
      <p style={{ marginTop: 10 }}>{mensagem}</p>
    </div>
  );
}

export default App;
