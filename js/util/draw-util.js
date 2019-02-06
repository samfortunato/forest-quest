export const drawShape = (being, ctx) => {
  ctx.fillStyle = being.color;
  ctx.fillRect(being.x, being.y, being.width, being.height);
};

// export const drawBeing = (being, ctx) => {
//   ctx.drawImage(
//     being.sprite,
//     26,
//     68,
//     21,
//     28,
//     being.x,
//     being.y,
//     21,
//     28
//   );
// };

export const drawPlayer = (being, ctx) => {
  ctx.drawImage(
    being.sprite,
    26, 68,
    21, 28,
    being.x, being.y,
    21, 28
  );
};

export const drawMonster = (being, ctx) => {
  ctx.drawImage(
    being.sprite,
    27, 85,
    19, 11,
    being.x, being.y,
    19, 11
  );
};
