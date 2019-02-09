import cloneDeep from 'lodash/cloneDeep';

import Scenery from '../scenery/scenery';
import Entity from '../beings/entity';
import Player from '../beings/player';

export const collisionDetected = (entity1, entity2) => {
  if (entity1.x < (entity2.x + entity2.width) &&
      (entity1.x + entity1.width) > entity2.x &&
      entity1.y < (entity2.y + entity2.height) &&
      (entity1.y + entity1.height) > entity2.y) {
    
    return true;
  }

  return false;
};

export const wouldCollide = (direction, entity1, entity2) => {
  const entity1Clone = cloneDeep(entity1);

  switch (direction) {
    case 'up':
      entity1Clone.y -= (entity1Clone.speed * entity1Clone.velocity);

      if (collisionDetected(entity1Clone, entity2)) return true;
      break;
    case 'right':
      entity1Clone.x += (entity1Clone.speed * entity1Clone.velocity);

      if (collisionDetected(entity1Clone, entity2)) return true;
      break;
    case 'down':
      entity1Clone.y += (entity1Clone.speed * entity1Clone.velocity);

      if (collisionDetected(entity1Clone, entity2)) return true;
      break;
    case 'left':
      entity1Clone.x -= (entity1Clone.speed * entity1Clone.velocity);

      if (collisionDetected(entity1Clone, entity2)) return true;
      break;
  }

  return false;
};

export const wouldCollideWithAny = (direction, entity, entities) => {
  const collidesWithSingleEntity = (singleEntity) => {
    if (singleEntity instanceof Player) {
      return false;
    } else if (singleEntity instanceof Scenery) {
      const sceneryValues = {
        x: singleEntity.boundaryX,
        y: singleEntity.boundaryY,
        width: singleEntity.boundaryWidth,
        height: singleEntity.boundaryHeight
      };

      return wouldCollide(direction, entity, sceneryValues);
    } else {
      return wouldCollide(direction, entity, singleEntity);
    }
  };
  
  const collidesWithAnyEntity = (otherEntity, i) => {
    return Object.values(otherEntity).some(collidesWithSingleEntity);
  };
  
  return Object.values(entities).some(collidesWithAnyEntity);
};
