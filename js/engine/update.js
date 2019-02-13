import entities from '../beings/entities';
import * as AttackUtil from '../util/attack-util';

const update = () => {
  const { player } = entities.beings.friendlies;
  const { enemies } = entities.beings;
  
  AttackUtil.attackCollision(player);

  Object.keys(enemies).forEach((enemyName) => {
    if (enemies[enemyName].stats.hp <= 0) {
      delete enemies[enemyName];
    } else {
      enemies[enemyName].update(entities);
    }
  });
};

export default update;
