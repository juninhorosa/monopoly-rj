const propriedades = [
  { nome: 'Copacabana', preco: 200, dono: null },
  { nome: 'Ipanema', preco: 250, dono: null },
  { nome: 'Lapa', preco: 180, dono: null },
  { nome: 'Maracanã', preco: 300, dono: null },
  { nome: 'Santa Teresa', preco: 150, dono: null }
];

let posicaoIA = 0;

function jogarIA(dado) {
  posicaoIA = (posicaoIA + dado) % propriedades.length;
  const prop = propriedades[posicaoIA];

  if (!prop.dono) {
    prop.dono = 'IA';
    return `IA comprou ${prop.nome} por R$${prop.preco}`;
  } else {
    return `IA caiu em ${prop.nome}, já pertence a ${prop.dono}`;
  }
}

module.exports = {
  jogarIA
};
