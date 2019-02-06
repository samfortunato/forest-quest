import { collisionDetected } from '../util/collision-util';
import { playerSprites } from '../beings/graphics/beings';

import entities from './entities';

class Player {
  constructor(x = 100, y = 100) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.speed = 3;
    this.velocity = 1;
    this.facing = 'down';
    this.sprite = playerSprites;
  }

  move(currentlyPressedKeys) {
    Object.keys(entities).forEach((entity, i) => {
      if (i === 0) return;
        
      if (collisionDetected(this, entity)) {
        return;
      } else if (currentlyPressedKeys.ArrowUp) {
        this.y -= (this.speed * this.velocity);
      } else if (currentlyPressedKeys.ArrowRight) {
        this.x += (this.speed * this.velocity);
      } else if (currentlyPressedKeys.ArrowDown) {
        this.y += (this.speed * this.velocity);
      } else if( currentlyPressedKeys.ArrowLeft) {
        this.x -= (this.speed * this.velocity);
      }
    });
  }
}

export default Player;
