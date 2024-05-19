const capaMusica = document.getElementById('capa-musica');
const nomeMusica = document.getElementById('nome-musica');
const artistaMusica = document.getElementById('artista-musica');

const buttonPlay = document.querySelector('#play');
const buttonPause = document.querySelector('#pause');
const buttonNext = document.querySelector('#next');
const buttonPrevious = document.querySelector('#previous');

const progressBar = document.getElementById("progressBar");
const tempoAtual = document.getElementById("tempoAtual");
const tempoTotal = document.getElementById("tempoTotal");


const musicas = [
  {
    nome: 'A Lua',
    artista: 'Lorennzo, Allanzinho',
    capaPath: 'assets/A Lua/Lua.png',
    musicaPath: 'assets/A Lua/A-Lua.mp3'
  },
  {
    nome: 'O Sol',
    artista: 'Vitor Kley',
    capaPath: 'assets/O Sol/Sol.png',
    musicaPath: 'assets/O Sol/O-Sol.mp3'
  },
  {
    nome: 'Stars',
    artista: 'Simply Red',
    capaPath: 'assets/A-estrela/estrela.png',
    musicaPath: 'assets/A-estrela/Stars.mp3'
  },
  {
    nome: 'Pra Onde Eu Irei?',
    artista: 'Morada',
    capaPath: 'assets/fundo-musica.png',
    musicaPath: 'assets/Pra-Onde-eu-irei.mp3'
  }
]

let music;
let indexMusicaAtual = 0;
setMusic(indexMusicaAtual)
let interval;


function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
}


function updateMusicTime() {
  const progresso = (music.currentTime / music.duration) * 100;
  progressBar.value = progresso;
  tempoAtual.textContent = formatarTempo(music.currentTime);
}

music.addEventListener('loadedmetadata', function () {
  tempoTotal.textContent = formatarTempo(music.duration);
});


function play() {
  buttonPlay.classList.add('hide');
  buttonPause.classList.remove('hide');
  music.play();
  interval = setInterval(updateMusicTime, 1000);
}


function pause() {
  buttonPlay.classList.remove('hide');
  buttonPause.classList.add('hide');
  music.pause();
}

function setMusic(index) {
  if (index < 0) {
    indexMusicaAtual = musicas.length;
  }
  if (index >= musicas.length) {
    indexMusicaAtual = 0;
  }

  artistaMusica.innerHTML = musicas[indexMusicaAtual].artista
  nomeMusica.innerHTML = musicas[indexMusicaAtual].nome
  capaMusica.setAttribute('src', musicas[indexMusicaAtual].capaPath)

  music = new Audio(musicas[indexMusicaAtual].musicaPath);
}


buttonPlay.addEventListener('click', play);
buttonPause.addEventListener('click', pause);

buttonNext.addEventListener('click', () => {
  pause();
  setMusic(++indexMusicaAtual);
  play();
});
buttonPrevious.addEventListener('click', () => {
  pause();
  setMusic(--indexMusicaAtual);
  play();
});