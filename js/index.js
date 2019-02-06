import { initializeControls, keypressListener } from './config/controls';
import { Player } from './beings/player';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;
canvas.style.backgroundColor = 'grey';

const currentlyPressedKeys = {};
initializeControls(currentlyPressedKeys);

const draw = () => {
  ctx.clearRect(0, 0, 800, 600);
  ctx.fillRect(Player.x, Player.y, Player.width, Player.height, '#000000');

  keypressListener(Player, currentlyPressedKeys);
  
  requestAnimationFrame(draw);
};

draw();
