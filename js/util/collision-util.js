export const collisionDetected = (entity1, entity2) => {
  if (entity1.x >= entity2.x && 
      entity1.x <= (entity2.x + entity2.width) &&
      entity1.y >= entity2.y &&
      entity1.y <= (entity2.y + entity2.height)) {

    return true;
  }

  return false;
};
