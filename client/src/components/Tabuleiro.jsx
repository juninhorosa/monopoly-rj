import React from 'react';

function Tabuleiro() {
  const casas = Array.from({ length: 40 }, (_, i) => (
    <div key={i} style={{
      border: '1px solid #ccc',
      padding: '10px',
      width: '60px',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      background: i === 0 ? '#ffd700' : '#fff'
    }}>
      {i === 0 ? 'Início' : 'RJ ' + i}
    </div>
  ));

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(10, 60px)',
      gap: '2px',
      justifyContent: 'center',
      margin: '20px auto',
      width: 'max-content'
    }}>
      {casas}
    </div>
  );
}

export default Tabuleiro;
