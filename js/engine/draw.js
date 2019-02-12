import entities from '../beings/entities';

import * as DrawEntityUtil from '../util/draw-util';

const draw = (ctx) => {
  const { player } = entities.beings.friendlies;
  const { enemies } = entities.beings;
  const { boundaries } = entities;
  
  ctx.clearRect(0, 0, 800, 600);

  DrawEntityUtil.drawBeing(player, ctx);
  DrawEntityUtil.drawBeing(enemies.basicEnemy, ctx);
  DrawEntityUtil.drawAttackBox(player, ctx);
  DrawEntityUtil.drawAllBoundaries(boundaries, ctx);
};

export default draw;
