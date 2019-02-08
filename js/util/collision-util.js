import cloneDeep from 'lodash/cloneDeep';

import Scenery from '../scenery/scenery';
import Entity from '../beings/entity';

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
  const collidesWithAnyBoundary = (boundary) => {
    if (boundary instanceof Scenery) {
      const sceneryValues = {
        x: boundary.boundaryX,
        y: boundary.boundaryY,
        width: boundary.boundaryWidth,
        height: boundary.boundaryHeight
      };

      return wouldCollide(direction, entity, sceneryValues);
    } else {
      return wouldCollide(direction, entity, boundary);
    }
  };
  
  const collidesWithAnyEntity = (otherEntity, i) => {
    if (i === 0) {
      return;
    } else {
      if (!(otherEntity instanceof Entity)) {
        return Object.values(otherEntity).some(collidesWithAnyBoundary);
      } else {
        return wouldCollide(direction, entity, otherEntity);
      }
    }
  };
  
  return Object.values(entities).some(collidesWithAnyEntity);
};
