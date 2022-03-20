const playBtn = document.querySelector('.player__nav-play');
const nextBtn = document.querySelector('.player__nav-forward');
const prevBtn = document.querySelector('.player__nav-backward');
const bg = document.querySelector('.background');
const playerPromo = document.querySelector('.player__promo-img');
const nameArt = document.querySelector('.player__nav-name');
const nameSong = document.querySelector('.player__nav-song');
const progressContainer = document.querySelector('.progress__container');
const progress = document.querySelector('.progress__line');
const progressCurrent = document.querySelector('.progress__current'); 
const progressLength = document.querySelector('.progress__length');     
const audio = new Audio();
const arrAudio = ['Beyonce', 'Linkin-park', 'Minelli'];
const arrSongs = ['Lemonade', 'Numb', 'Rampampam'];
let playNum = 0;

audio.src = `./src/audio/${arrAudio[playNum]+'.mp3'}`;

function playAudio() {
  bg.src = `./src/img/${arrAudio[playNum]+'.png'}`;
  playerPromo.src = `./src/img/${arrAudio[playNum]+'.png'}`;
  nameArt.innerHTML = `${arrAudio[playNum]}`;
  nameSong.innerHTML = `${arrSongs[playNum]}`;

  const isPlay = playBtn.classList.contains('player__nav-play_active');
  if(!isPlay) {
    audio.play();
    playBtn.classList.add('player__nav-play_active')
  } else {
      audio.pause();
      playBtn.classList.remove('player__nav-play_active')
  }
}

function prevPlay() {
    playBtn.classList.remove('player__nav-play_active')
    playNum--
    if(playNum < 0) {
        playNum = arrAudio.length - 1;
    }
    audio.src = `./src/audio/${arrAudio[playNum]+'.mp3'}`;
    playAudio();
}

function nextPlay() {
    playBtn.classList.remove('player__nav-play_active')
    playNum++
    if(playNum > arrAudio.length - 1) {
        playNum = 0;
    }
    audio.src = `./src/audio/${arrAudio[playNum]+'.mp3'}`;
    playAudio();
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    progressCurrent.innerHTML = `${currentMin}:${currentSec}`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const x = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (x / width) * duration;
}

audio.addEventListener('loadeddata', () => {
    let totalMin = Math.floor(audio.duration / 60);
    let totalSec = Math.floor(audio.duration % 60);
    if(totalSec < 10) {
        totalSec = `0${totalSec}`;
    }
progressLength.innerHTML = `${totalMin}:${totalSec}`;
});


playBtn.addEventListener('click', playAudio);
nextBtn.addEventListener('click', nextPlay);
prevBtn.addEventListener('click', prevPlay);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextPlay);