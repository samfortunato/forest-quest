import * as SetupUtil from './config/setup';
import * as DrawEntityUtil from './util/draw-util';
import entities from './beings/entities';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
SetupUtil.setup(canvas);

const currentlyPressedKeys = {};
SetupUtil.initializeControls(currentlyPressedKeys);

const draw = () => {
  const { player, basicEnemy, boundaries } = entities;
  
  ctx.clearRect(0, 0, 800, 600);

  player.move(currentlyPressedKeys);
  // basicEnemy.track(player);
  
  DrawEntityUtil.drawBeing(player, ctx);
  // DrawEntityUtil.drawBeing(basicEnemy, ctx);
  DrawEntityUtil.drawAllBoundaries(boundaries, ctx);
  
  requestAnimationFrame(draw);
};

draw();
