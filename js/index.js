import entities from './beings/entities';

import * as GameUtil from './engine/setup';
import * as AttackUtil from './util/attack-util';
import draw from './engine/draw';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
GameUtil.setup(canvas);

const currentlyPressedKeys = {};
GameUtil.initializeControls(currentlyPressedKeys);

const gameLoop = () => {
  const { player } = entities.beings.friendlies;
  const { enemies } = entities.beings;
  const { boundaries } = entities;

  Object.keys(enemies).forEach((enemyName) => {
    if (enemies[enemyName].stats.hp <= 0) {
      delete enemies[enemyName];
    } else {
      enemies[enemyName].track(player);
    }
  });

  player.controls(currentlyPressedKeys);

  AttackUtil.attackCollision(player);

  draw(ctx);
  
  requestAnimationFrame(gameLoop);
};

gameLoop();
