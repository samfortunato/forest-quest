import Scenery from '../scenery/scenery';

export const drawBeing = (being, ctx) => {
  const playerSpriteCropData = being.spriteCropData();

  let cropBox, spriteSize;
  
  switch (being.frameIndex) {
    case 0:
      cropBox = playerSpriteCropData[being.facing][0][0];
      spriteSize = playerSpriteCropData[being.facing][0][1];

      break;
    case 1:
      cropBox = playerSpriteCropData[being.facing][1][0];
      spriteSize = playerSpriteCropData[being.facing][1][1];

      break;
    case 2:
      cropBox = playerSpriteCropData[being.facing][0][0];
      spriteSize = playerSpriteCropData[being.facing][0][1];

      break;
    case 3:
      cropBox = playerSpriteCropData[being.facing][2][0];
      spriteSize = playerSpriteCropData[being.facing][2][1];

      break;
  }
  
  ctx.drawImage(
    being.sprite,
    ...cropBox,
    ...spriteSize,
    being.x, being.y,
    ...spriteSize
  );
};

export const drawEntity = (entity, ctx) => {
  ctx.fillStyle = entity.color;
  ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
};

export const drawSceneryBounds = (object, ctx) => {
  ctx.fillStyle = 'rgba(255, 0, 0, .5)';
  
  // Draw object sprite bounds
  ctx.fillRect(object.x, object.y, object.width, object.height);
  
  // Draw object collision bounds
  ctx.fillRect(
    object.boundaryX,
    object.boundaryY,
    object.boundaryWidth,
    object.boundaryHeight
  );
};

export const drawScenery = (object, ctx) => {
  ctx.drawImage(object.sprite, ...object.spriteCropData);
};

export const drawAllBoundaries = (boundaries, ctx) => {
  Object.values(boundaries).forEach((boundary) => {
    if (boundary instanceof Scenery) {
      drawScenery(boundary, ctx);
    } else {
      drawEntity(boundary, ctx);
    }
  });
};
