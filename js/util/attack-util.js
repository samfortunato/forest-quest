import { collisionDetected } from './collision-util';
import entities from '../beings/entities';

export const attackCollision = (entity) => {
  const { enemies } = entities.beings;

  Object.values(enemies).forEach((enemy) => {
    if (collisionDetected(entity, enemy)) {
      entity.hurt(enemy.stats.attack);
      console.log(entity.stats.hp);
    }
  });
};
