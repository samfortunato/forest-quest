import Entity from './entity';
import { monsterSprites1 } from './graphics/beings';

class BasicEnemy extends Entity {
  constructor(x = 200, y = 200) {
    super(x, y, 36, 24);

    this.speed = 1;
    this.facing = 'down';
    
    this.sprite = monsterSprites1;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 8;
    this.numberOfFrames = 4;
  }

  spriteCropData() {
    return {
      up: [
        [[54, 42], [38, 22]],
        [[8, 38], [34, 26]],
        [[104, 38], [34, 26]]
      ],
      right: [
        [[52, 106], [38, 22]],
        [[6, 102], [34, 26]],
        [[102, 102], [34, 26]]
      ],
      down: [
        [[54, 170], [38, 22]],
        [[8, 166], [34, 26]],
        [[104, 166], [34, 26]]
      ],
      left: [
        [[54, 234], [38, 22]],
        [[8, 230], [34, 26]],
        [[104, 230], [34, 26]]
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

  track(entity) {
    if (entity.y < (this.y - entity.height)) {
      this.facing = 'up';
      this.animate();
      this.y -= this.speed;
    } else if (entity.x > this.x) {
      this.facing = 'right';
      this.animate();
      this.x += this.speed;
    } else if (entity.y > this.y) {
      this.facing = 'down';
      this.animate();
      this.y += this.speed;
    } else if (entity.x < this.x) {
      this.facing = 'left';
      this.animate();
      this.x -= this.speed;
    }
  }
}

export default BasicEnemy;
