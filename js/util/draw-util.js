import Scenery from '../scenery/scenery';
import Being from '../beings/being';
import Player from '../beings/player';

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
  
  if (being.alpha) {
    ctx.globalAlpha = being.alpha;
  }
  
  ctx.drawImage(
    being.sprite,
    ...cropBox,
    ...spriteSize,
    being.x, being.y,
    ...spriteSize
  );

  ctx.globalAlpha = 1;
};

export const drawPlayerIdle = (player, ctx) => {
  const { sprite } = player;
  const cropData = sprite.idleCropData();
  const cropBox = cropData[player.facing][0];
  const spriteSize = cropData[player.facing][1];

  sprite.frameIndex = 0;
  
  ctx.globalAlpha = sprite.alpha;

  ctx.drawImage(
    sprite.spriteSets.idle,
    ...cropBox,
    ...spriteSize,
    player.x, player.y,
    ...spriteSize
  );

  ctx.globalAlpha = 1;
};

export const drawPlayerWalk = (player, ctx) => {
  
  const { sprite } = player;
  const cropData = sprite.walkCropData();

  let cropBox, spriteSize;
  
  switch (sprite.frameIndex) {
    case 0:
      cropBox = cropData[player.facing][0][0];
      spriteSize = cropData[player.facing][0][1];

      break;
      case 1:
      cropBox = cropData[player.facing][1][0];
      spriteSize = cropData[player.facing][1][1];

      break;
      case 2:
      cropBox = cropData[player.facing][0][0];
      spriteSize = cropData[player.facing][0][1];
      
      break;
      case 3:
      cropBox = cropData[player.facing][2][0];
      spriteSize = cropData[player.facing][2][1];
      
      break;
  }
  
  sprite.animateWalk();

  ctx.globalAlpha = sprite.alpha;
    
  ctx.drawImage(
    sprite.spriteSets.walk,
    ...cropBox,
    ...spriteSize,
    player.x, player.y,
    ...spriteSize
  );

  ctx.globalAlpha = 1;
};

export const drawPlayerJump = (player, ctx) => {
  const { sprite } = player;
  const cropData = sprite.jumpCropData();
  const cropBox = cropData[player.facing][0];
  const spriteSize = cropData[player.facing][1];

  ctx.globalAlpha = sprite.alpha;

  ctx.drawImage(
    sprite.spriteSets.jump,
    ...cropBox,
    ...spriteSize,
    sprite.x, sprite.y,
    ...spriteSize
  );
  
  ctx.globalAlpha = 1;
};

export const drawPlayerAttack = (player, ctx) => {
  const attackSpriteCropData = player.sprite.attackCropData();
  const cropBox = attackSpriteCropData[player.facing][0];
  const spriteSize = attackSpriteCropData[player.facing][1];

  let spritePosition;

  switch (player.facing) {
    case 'up':
      spritePosition = [player.x - 2, player.y - 18];
      break;
    case 'right':
      spritePosition = [player.x, player.y + 4];
      break;
    case 'down':
      spritePosition = [player.x - 2, player.y + 6];
      break;
    case 'left':
      spritePosition = [player.x - 29, player.y + 4];
      break;
  }

  ctx.drawImage(
    player.sprite.spriteSets.attack,
    ...cropBox,
    ...spriteSize,
    ...spritePosition,
    ...spriteSize
  );
};

export const drawPlayer = (player, ctx) => {
  const { sprite } = player;
  const playerState = player.stats.currentState;

  if (player.stats.invincible) {
    sprite.alpha = 0.5;
  } else {
    sprite.alpha = 1;
  }

  switch (playerState) {
    case 'IDLE':
      drawPlayerIdle(player, ctx);
      break;
    
    case 'MOVING':
      drawPlayerWalk(player, ctx);
      break;
    
    case 'JUMPING':
      if (sprite.spriteJumpOffset === 0) {
        sprite.spriteJumpOffset = player.zVelocity;

        sprite.setPosition(
          player.x, player.y - sprite.spriteJumpOffset
        );
      } else if (player.zVelocity > -4.1) {
        sprite.spriteJumpOffset += player.zVelocity;
        
        sprite.setPosition(
          player.x, player.y - sprite.spriteJumpOffset
        );
      } else {
        sprite.spriteJumpOffset = 0;
        sprite.setPosition(player.x, player.y);
      }

      drawPlayerJump(player, ctx);
      break;

    case 'ATTACKING':
      drawPlayerAttack(player, ctx);
      break;

    case 'HURT':
      drawPlayerWalk(player, ctx);
      break;

    default:
      sprite.setPosition(player.x, player.y);
      drawPlayerWalk(player, ctx);
      break;
  }
};

export const drawAttackBox = (entity, ctx) => {
  const { up, right, down, left } = entity.attackBox();
  ctx.fillStyle = 'rgba(255, 0, 0, 0)';

  if (entity.stats.currentState !== 'ATTACKING') {
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
    } else if (entity instanceof Player) {
      drawPlayer(entity, ctx);
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
