import { CurrentGame } from './setup';

import entities from '../beings/entities';
import * as DrawEntityUtil from '../util/draw-util';
import { drawTitleScreen } from '../options/title_screen_draw';

const draw = (ctx) => {
  switch (CurrentGame.currentState()) {
    case 'ON_TITLE_SCREEN': {
      drawTitleScreen(ctx);
      break;
    }

    case 'PLAYING': {
      const { player } = entities.beings.friendlies;
    
      ctx.clearRect(0, 0, 800, 608);
    
      DrawEntityUtil.drawAllEntities(entities, ctx);
      DrawEntityUtil.drawAttackBox(player, ctx);
    }
  }
};

export default draw;
