import { CurrentGame } from './setup';
import AudioPlayer from '../audio/audio_player';

import { updateTitleScreen } from '../options/title_screen_update';
import entities from '../beings/entities';
import * as AttackUtil from '../util/attack-util';

const update = () => {
  switch (CurrentGame.currentState()) {
    case 'ON_TITLE_SCREEN': {
      updateTitleScreen();
      break;
    }
    
    case 'PLAYING': {
      const { player } = entities.beings.friendlies;
      const { enemies } = entities.beings;
      
      AttackUtil.attackCollision(player);
      player.update();
    
      Object.keys(enemies).forEach((enemyName) => {
        if (enemies[enemyName].stats.hp <= 0) {
          delete enemies[enemyName];
        } else {
          enemies[enemyName].update();
        }
      });
    }
  }

  AudioPlayer.update();
};

export default update;
