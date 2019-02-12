import Entity from './entity';
import { monsterSprites1 } from './graphics/beings';

class BasicEnemy extends Entity {
  constructor(x = 200, y = 200) {
    super(x, y, 36, 24);

    this.stats = {
      hp: 3,
      attack: 1
    };
    
    this.speed = 1;
    this.velocity = 1;
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
        [[8, 40], [34, 26]],
        [[104, 40], [34, 26]]
      ],
      right: [
        [[52, 106], [38, 22]],
        [[6, 104], [34, 26]],
        [[102, 104], [34, 26]]
      ],
      down: [
        [[54, 170], [38, 22]],
        [[8, 168], [34, 26]],
        [[104, 168], [34, 26]]
      ],
      left: [
        [[54, 234], [38, 22]],
        [[8, 232], [34, 26]],
        [[104, 232], [34, 26]]
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
    if (entity.y < this.y) {
      this.facing = 'up';
      this.animate();

      this.move(this.facing);
    } else if (entity.x > this.x) {
      this.facing = 'right';
      this.animate();

      this.move(this.facing);
    } else if (entity.y > this.y) {
      this.facing = 'down';
      this.animate();

      this.move(this.facing);
    } else if (entity.x < this.x) {
      this.facing = 'left';
      this.animate();

      this.move(this.facing);
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

  hurt(amount) {
    this.stats.hp -= amount;
  }
}

export default BasicEnemy;
