import { collisionDetected } from './collision-util';
import entities from '../beings/entities';

export const attackCollision = (entity) => {
  const { enemies } = entities.beings;

  Object.values(enemies).forEach((enemy) => {
    if (collisionDetected(entity, enemy)) {
      if (!entity.stats.invincible &&
          entity.stats.currentState !== 'JUMPING') {

        entity.setState('HURT');
        entity.knockbackFrames.direction = enemy.facing;
      }
    }
  });
};
