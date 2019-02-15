import Game from './game';

export const setup = (canvasEl) => {
  canvasEl.width = 800;
  canvasEl.height = 608;
  canvasEl.style.backgroundImage = 'url(./img/backgrounds/grass.png)';

  const ctx = canvasEl.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  return ctx;
};

export const currentlyPressedKeys = {};

export const initializeControls = () => {
  document.addEventListener('keydown', (e) => {
    currentlyPressedKeys[e.key] = true;
  });

  document.addEventListener('keyup', (e) => {
    currentlyPressedKeys[e.key] = false;
  });
};

export const audioPlayer = {
  music: document.querySelector('#music'),
  sfx1: document.querySelector('#sfx-1')
};

export const CurrentGame = new Game();
