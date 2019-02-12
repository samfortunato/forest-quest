import Scenery from '../scenery/scenery';
import Being from '../beings/being';

export const drawBeing = (being, ctx) => {
  const spriteCropData = being.spriteCropData();

  let cropBox, spriteSize;
  
  switch (being.frameIndex) {
    case 0:
      cropBox = spriteCropData[being.facing][0][0];
      spriteSize = spriteCropData[being.facing][0][1];

      break;
    case 1:
      cropBox = spriteCropData[being.facing][1][0];
      spriteSize = spriteCropData[being.facing][1][1];

      break;
    case 2:
      cropBox = spriteCropData[being.facing][0][0];
      spriteSize = spriteCropData[being.facing][0][1];

      break;
    case 3:
      cropBox = spriteCropData[being.facing][2][0];
      spriteSize = spriteCropData[being.facing][2][1];

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

export const drawAttackBox = (entity, ctx) => {
  const { up, right, down, left } = entity.attackBox();
  ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';

  if (entity.attacking === false) {
    return;
  }
  
  switch (entity.facing) {
    case 'up':
      ctx.fillRect(up.x, up.y, up.width, up.height);
      break;
    case 'right':
      ctx.fillRect(right.x, right.y, right.width, right.height);
      break;
    case 'down':
      ctx.fillRect(down.x, down.y, down.width, down.height);
      break;
    case 'left':
      ctx.fillRect(left.x, left.y, left.width, left.height);
      break;
  }
};

export const drawEntity = (entity, ctx) => {
  ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
  ctx.fillRect(entity.x, entity.y, entity.width, entity.height);
};

export const drawSceneryBounds = (object, ctx) => {
  ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
  
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

export const drawAllEntities = (entities, ctx) => {
  Object.values(entities).forEach((entity) => {
    if (entity.constructor === Object) {
      drawAllEntities(entity, ctx);
    } else if (entity instanceof Scenery) {
      drawScenery(entity, ctx);
    } else if (entity instanceof Being) {
      drawBeing(entity, ctx);
    } else {
      drawEntity(entity, ctx);
    }
  });
};

export const mapEntitiesToLayers = (entities, drawLayers) => {
  Object.values(entities).forEach((entity) => {
    drawLayers[entity.drawLayer].push(entity);
  });
};

export const drawAllLayers = (drawLayers, ctx) => {
  Object.values(drawLayers).forEach((layer) => {
    drawAllEntities(Array.values(layer), ctx);
  });
};
