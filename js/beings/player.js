import Entity from './entity';
import { wouldCollideWithAny } from '../util/collision-util';
import { playerSprites } from '../beings/graphics/beings';

import entities from './entities';

class Player extends Entity {
  constructor(x = 100, y = 100) {
    super(x, y, 42, 56);

    this.speed = 4;
    this.velocity = 1;
    this.facing = 'down';

    this.attacking = false;
    
    this.sprite = playerSprites;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 5;
    this.numberOfFrames = 4;
  }

  spriteCropData() {
    return {
      up: [
        [[54, 8], [38, 56]],
        [[6, 8], [44, 54]],
        [[102, 8], [44, 54]]
      ],
      right: [
        [[54, 72], [34, 56]],
        [[6, 72], [38, 54]],
        [[102, 72], [38, 54]]
      ],
      down: [
        [[52, 136], [42, 56]],
        [[4, 136], [46, 54]],
        [[100, 136], [46, 54]]
      ],
      left: [
        [[56, 200], [34, 56]],
        [[8, 200], [38, 54]],
        [[104, 200], [38, 54]]
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

  attackBox() {
    return {
      up: {
        x: this.x,
        y: (this.y - (this.height / 2)),
        width: 42,
        height: 28
      },
      right: {
        x: (this.x + this.width),
        y: (this.y + (this.height / 2)),
        width: 28,
        height: 42
      },
      down: {
        x: this.x,
        y: (this.y + this.height),
        width: this.width,
        height: (this.height / 2)
      },
      left: {
        x: (this.x - this.width + 10),
        y: (this.y + (this.height / 2)),
        width: 28,
        height: 42
      }
    };
  }

  controls(currentlyPressedKeys) {
    if (currentlyPressedKeys.ArrowUp) {
      this.facing = 'up';
      this.animate();
      
      if (!wouldCollideWithAny(this.facing, this, entities)) {
        this.move(this.facing);
      }
    } else if (currentlyPressedKeys.ArrowRight) {
      this.facing = 'right';
      this.animate();

      if (!wouldCollideWithAny(this.facing, this, entities)) {
        this.move(this.facing);
      }
    } else if (currentlyPressedKeys.ArrowDown) {
      this.facing = 'down';
      this.animate();

      if (!wouldCollideWithAny(this.facing, this, entities)) {
        this.move(this.facing);
      }
    } else if (currentlyPressedKeys.ArrowLeft) {
      this.facing = 'left';
      this.animate();

      if (!wouldCollideWithAny(this.facing, this, entities)) {
        this.move(this.facing);
      }
    } else if (currentlyPressedKeys[' ']) {
      this.attack();
    } else {
      this.attacking = false;
    }
  }

  move(direction) {
    const moveSpeed = (this.speed * this.velocity);
    
    switch (direction) {
      case 'up':
        this.y -= moveSpeed;
        break;
      case 'right':
        this.x += moveSpeed;
        break;
      case 'down':
        this.y += moveSpeed;
        break;
      case 'left':
        this.x -= moveSpeed;
        break;
    }
  }

  attack() {
    this.attacking = true;
  }
}

export default Player;

