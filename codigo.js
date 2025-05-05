
const alfabeto = document.getElementById('alfabeto');
const palavra = document.getElementById('palavra');
const mensagem = document.getElementById('mensagem');
const nomeInput = document.getElementById('nome');
const enviarButton = document.getElementById('enviar');
const rankingDiv = document.getElementById('ranking');

let palavraSorteada = '';
let letrasCertas = [];
let letrasErradas = [];
let pontos = 0;
let ranking = [];

fetch('palavras.json')
  .then(response => response.json())
  .then(data => {
    const palavras = data.palavras;
    sorteiaPalavra(palavras);
  })
  .catch(error => console.error('Erro ao carregar o arquivo JSON:', error));

function sorteiaPalavra(palavras) {
  const indice = Math.floor(Math.random() * palavras.length);
  palavraSorteada = palavras[indice];
  letrasCertas = Array(palavraSorteada.length).fill('');
  letrasErradas = [];
  pontos = 0;
  atualizaPalavra();
  criaAlfabeto();
}

function atualizaPalavra() {
  palavra.innerHTML = letrasCertas.map(letra => letra || '_').join(' ');
}

function criaAlfabeto() {
  for (let letra = 'a'.charCodeAt(0); letra <= 'z'.charCodeAt(0); letra++) {
    const botao = document.createElement('button');
    botao.textContent = String.fromCharCode(letra);
    botao.dataset.letra = String.fromCharCode(letra);
    botao.onclick = () => verificaLetra(String.fromCharCode(letra));
    alfabeto.appendChild(botao);
  }
}

function verificaLetra(letra) {
    if (palavraSorteada.includes(letra)) {
      for (let i = 0; i < palavraSorteada.length; i++) {
        if (palavraSorteada[i] === letra) {
          letrasCertas[i] = letra;
        }
      }
      pontos++;
      atualizaPalavra();
    } else {
      letrasErradas.push(letra);
      const botao = alfabeto.querySelector(`button[data-letra="${letra}"]`);
      botao.style.backgroundColor = 'red';
      botao.disabled = true;
    }
  }
  
  function enviaNome() {
    const nome = nomeInput.value.trim();
    if (nome) {
      ranking.push({ nome, pontos });
      ranking.sort((a, b) => b.pontos - a.pontos);
      atualizaRanking();
      nomeInput.value = '';
    }
  }
  
  function atualizaRanking() {
    rankingDiv.innerHTML = ranking.map((jogador, indice) => `${indice + 1}. ${jogador.nome} - ${jogador.pontos} pontos`).join('<br>');
  }
  
  enviarButton.onclick = enviaNome;
  