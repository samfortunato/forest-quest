export const pointWithinLine = (point, line) => {
  return ((line.start.x <= point.x && point.x <= line.end.x) &&
          (line.start.y <= point.y && point.y <= line.end.y));
};

export const entityCornerCoords = (entity) => {
  return {
    topLeft: {
      x: entity.x,
      y: entity.y
    },
    topRight: {
      x: (entity.x + entity.width),
      y: (entity.y + entity.width)
    },
    bottomRight: {
      x: (entity.x + entity.width + entity.height),
      y: (entity.y + entity.width + entity.height)
    },
    bottomLeft: {
      x: (entity.x + entity.height),
      y: (entity.y + entity.height)
    }
  };
};

export const entityBoundaryLines = (entityCornerCoords) => {
  return {
    topLine: {
      start: entityCornerCoords.topLeft,
      end: entityCornerCoords.topRight
    },
    rightLine: {
      start: entityCornerCoords.topRight,
      end: entityCornerCoords.bottomRight
    },
    bottomLine: {
      start: entityCornerCoords.bottomRight,
      end: entityCornerCoords.bottomLeft
    },
    leftLine: {
      start: entityCornerCoords.bottomLeft,
      end: entityCornerCoords.topLeft
    }
  };
};

export const collisionDetected = (entity1, entity2) => {
  const entity1Coords = entityCornerCoords(entity1);
  const entity2Coords = entityCornerCoords(entity2);

  const entity2BoundaryLines = entityBoundaryLines(entity2Coords);

  const { topLeft, topRight, bottomRight, bottomLeft } = entity1Coords;
  const { topLine, rightLine, bottomLine, leftLine } = entity2BoundaryLines;
  
  if (pointWithinLine(topLeft, rightLine) &&
      pointWithinLine(topLeft, bottomLine)) {
    return true;
  } else if (pointWithinLine(topRight, bottomLine) &&
             pointWithinLine(topRight, leftLine)) {
    return true;
  } else if (pointWithinLine(bottomRight, leftLine) &&
             pointWithinLine(bottomRight, topLine)) {
    return true;
  } else if (pointWithinLine(bottomLeft, topLine) &&
             pointWithinLine(bottomLeft, rightLine)) {
    return true;
  }

  return false;
};

export const collisionType = (entity1, entity2) => {
  if (collisionDetected(entity1, entity2)) {
    switch (entity2.facing) {
      case 'up':
        return 'down';
      case 'right':
        return 'left';
      case 'down':
        return 'up';
      case 'left':
        return 'right';
    }
  }
};
