export const drawBeing = (ctx, being) => {
  ctx.fillStyle = being.color;
  ctx.fillRect(being.x, being.y, being.width, being.height);
};
