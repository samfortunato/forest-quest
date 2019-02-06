import { setup } from './config/setup';
import { initializeControls} from './config/controls';
import { drawPlayer, drawMonster } from './util/draw-util';
import Player from './beings/player';
import BasicEnemy from './beings/basic-enemy';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
setup(canvas);

const currentlyPressedKeys = {};
initializeControls(currentlyPressedKeys);

const player = new Player();
const basicEnemy = new BasicEnemy();

const draw = () => {
  ctx.clearRect(0, 0, 800, 600);

  player.move(currentlyPressedKeys);
  drawPlayer(player, ctx);

  basicEnemy.track(player);
  drawMonster(basicEnemy, ctx);
  
  requestAnimationFrame(draw);
};

draw();
