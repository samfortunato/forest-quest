import * as SetupUtil from './config/setup';
import * as DrawEntityUtil from './util/draw-util';
import entities from './beings/entities';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
SetupUtil.setup(canvas);

const currentlyPressedKeys = {};
SetupUtil.initializeControls(currentlyPressedKeys);

const draw = () => {
  const { player } = entities.beings.friendlies;
  const { enemies } = entities.beings;
  const { boundaries } = entities;
  
  ctx.clearRect(0, 0, 800, 600);

  Object.keys(enemies).forEach((enemyName) => {
    if (enemies[enemyName].hp <= 0) {
      delete enemies[enemyName];
    } else {
      enemies[enemyName].track(player);
      DrawEntityUtil.drawBeing(enemies.basicEnemy, ctx);
    }
  });
  
  player.controls(currentlyPressedKeys);
  
  DrawEntityUtil.drawBeing(player, ctx);
  DrawEntityUtil.drawAttackBox(player, ctx);
  DrawEntityUtil.drawAllBoundaries(boundaries, ctx);
  
  requestAnimationFrame(draw);
};

draw();
