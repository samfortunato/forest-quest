import { monsterSprites1 } from './graphics/beings';

class BasicEnemy {
  constructor(x = 200, y = 200) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;

    this.speed = 1;
    this.facing = 'down';
    
    this.sprite = monsterSprites1;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 4;
    this.numberOfFrames = 4;
  }

  spriteCropData() {
    
  }

  animate() {
    this.tickCount += 1;

    if (this.tickCount > this.ticksPerFrame) {
      this.tickCount = 0;

      if (this.frameIndex < this.numberOfFrames) {
        this.frameIndex += 1;
      } else {
        this.frameIndex = 0;
      }
    }
  }

  track(entity) {
    if (entity.y < this.y) {
      this.facing = 'up';
      this.y -= this.speed;
    } else if (entity.x > this.x) {
      this.facing = 'right';
      this.x += this.speed;
    } else if (entity.y > this.y) {
      this.facing = 'down';
      this.y += this.speed;
    } else if (entity.x < this.x) {
      this.facing = 'left';
      this.x -= this.speed;
    }
  }
}

export default BasicEnemy;
