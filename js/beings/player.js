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
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 4;
    this.numberOfFrames = 4;
  }

  spriteCropData() {
    return {
      up: [
        [[54, 8], [38, 56]],
        [[2, 10], [44, 54]],
        [[100, 10], [44, 54]]
      ],
      right: [
        [[54, 72], [34, 56]],
        [[2, 74], [38, 54]],
        [[98, 74], [38, 54]]
      ],
      down: [
        [[52, 136], [42, 56]],
        [[2, 138], [46, 54]],
        [[98, 138], [46, 54]]
      ],
      left: [
        [[56, 200], [34, 56]],
        [[8, 202], [38, 54]],
        [[104, 202], [38, 54]]
      ]
    };
  }

  animate() {
    this.tickCount += 1;

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.frameIndex < this.numberOfFrames - 1) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
  }

  move(currentlyPressedKeys) {
    Object.keys(entities).forEach((entity, i) => {
      if (i === 0) return;
        
      if (collisionDetected(this, entity)) {
        this.velocity = 0;
      } else {
        this.velocity = 1;
      }
      
      if (currentlyPressedKeys.ArrowUp) {
        this.facing = 'up';
        this.animate();
        this.y -= (this.speed * this.velocity);
      } else if (currentlyPressedKeys.ArrowRight) {
        this.facing = 'right';
        this.animate();
        this.x += (this.speed * this.velocity);
      } else if (currentlyPressedKeys.ArrowDown) {
        this.facing = 'down';
        this.animate();
        this.y += (this.speed * this.velocity);
      } else if( currentlyPressedKeys.ArrowLeft) {
        this.facing = 'left';
        this.animate();
        this.x -= (this.speed * this.velocity);
      }
    });
  }
}

export default Player;
