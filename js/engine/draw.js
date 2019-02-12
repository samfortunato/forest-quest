import entities from '../beings/entities';

import * as DrawEntityUtil from '../util/draw-util';

const draw = (ctx) => {
  const { player } = entities.beings.friendlies;

  ctx.clearRect(0, 0, 800, 600);

  DrawEntityUtil.drawAllEntities(entities, ctx);
  DrawEntityUtil.drawAttackBox(player, ctx);
};

export default draw;
