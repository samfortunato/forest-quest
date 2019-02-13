import Scenery from '../scenery/scenery';
import Player from '../beings/player';
import BasicEnemy from '../beings/basic-enemy';

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
  const entity1MoveInfo = {
    x: entity1.x,
    y: entity1.y,
    width: entity1.width,
    height: entity1.height,
    speed: entity1.speed,
    groundVelocity: entity1.groundVelocity
  };

  const entity1MoveSpeed = (
    entity1MoveInfo.speed * entity1MoveInfo.groundVelocity
  );

  switch (direction) {
    case 'up':
      entity1MoveInfo.y -= entity1MoveSpeed;

      if (collisionDetected(entity1MoveInfo, entity2)) return true;
      break;
    case 'right':
      entity1MoveInfo.x += entity1MoveSpeed;

      if (collisionDetected(entity1MoveInfo, entity2)) return true;
      break;
    case 'down':
      entity1MoveInfo.y += entity1MoveSpeed;

      if (collisionDetected(entity1MoveInfo, entity2)) return true;
      break;
    case 'left':
      entity1MoveInfo.x -= entity1MoveSpeed;

      if (collisionDetected(entity1MoveInfo, entity2)) return true;
      break;
  }

  return false;
};

export const wouldCollideWithSceneryObj = (direction, entity, sceneryObj) => {
  const sceneryValues = {
    x: sceneryObj.boundaryX,
    y: sceneryObj.boundaryY,
    width: sceneryObj.boundaryWidth,
    height: sceneryObj.boundaryHeight
  };

  return wouldCollide(direction, entity, sceneryValues);
};

export const wouldCollideWithAny = (direction, entity, entities) => {
  return Object.values(entities).some((otherEntity) => {
    if (otherEntity.constructor === Object) {
      return wouldCollideWithAny(direction, entity, otherEntity);
    } else if (otherEntity instanceof Player) {
      return false;
    } else if (otherEntity instanceof BasicEnemy) {
      return false;
    } else if (otherEntity instanceof Scenery) {
      return wouldCollideWithSceneryObj(direction, entity, otherEntity);
    } else {
      return wouldCollide(direction, entity, otherEntity);
    }
  });
};
