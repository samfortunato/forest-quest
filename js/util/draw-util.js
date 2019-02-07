export const drawBeing = (being, ctx) => {
  let cropBox, spriteSize;

  const playerSpriteCropData = being.spriteCropData();
  
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
