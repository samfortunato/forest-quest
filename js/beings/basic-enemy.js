import Being from './being';
import { monsterSprites1 } from './graphics/beings';
import { wouldCollideWithAny } from '../util/collision-util';

import entities from './entities';

class BasicEnemy extends Being {
  constructor(x = 200, y = 200) {
    super(x, y, 36, 24);

    this.stats = {
      currentState: 'TRACK',

      hp: 3,
      attack: 1
    };
    
    this.speed = 1;
    this.groundVelocity = 1;
    this.facing = 'down';
    
    this.sprite = monsterSprites1;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 8;
    this.numberOfFrames = 4;

    this.currentKnockbackFrame = 0;
    this.maxKnockbackFrames = 5;
    this.knockbackDir = '';
  }

  possibleStates() {
    return [
      'TRACK',
      'HURT'
    ];
  }

  update() {
    const { currentState } = this.stats;
    const { player } = entities.beings.friendlies;

    switch (currentState) {
      case 'TRACK':
        this.track(player);
        break;

      case 'HURT':
        if (this.currentKnockbackFrame === 0) {
          this.hurt(player.stats.attack);
          this.knockbackDir = player.facing;

          this.knockback(this.knockbackDir);
        } else if (this.currentKnockbackFrame > 0 &&
          this.currentKnockbackFrame < this.maxKnockbackFrames) {

          this.knockback(this.knockbackDir);
        } else if (this.currentKnockbackFrame >= this.maxKnockbackFrames) {
          this.currentKnockbackFrame = 0;
          this.knockbackDir = '';

          this.setState('TRACK');
        }

        break;

      default:
        break;
    }
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

  setState(state) {
    if (this.possibleStates().includes(state)) {
      this.stats.currentState = state;
    }
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
    if ((entity.y + (entity.height / 2)) < this.y) {
      this.facing = 'up';
      this.animate();

      this.move(this.facing);
    } else if (entity.x > this.x) {
      this.facing = 'right';
      this.animate();

      this.move(this.facing);
    } else if ((entity.y + (entity.height / 2)) > this.y) {
      this.facing = 'down';
      this.animate();

      this.move(this.facing);
    } else if (entity.x < this.x) {
      this.facing = 'left';
      this.animate();

      this.move(this.facing);
    }
  }

  move(direction, moveSpeed) {
    moveSpeed = moveSpeed || (this.speed * this.groundVelocity);
    
    switch (direction) {
      case 'up':
        if (!wouldCollideWithAny(direction, this, entities)) {
          this.y -= moveSpeed;
        }

        break;
      case 'right':
        if (!wouldCollideWithAny(direction, this, entities)) {
          this.x += moveSpeed;
        }

        break;
      case 'down':
        if (!wouldCollideWithAny(direction, this, entities)) {
          this.y += moveSpeed;
        }

        break;
      case 'left':
        if (!wouldCollideWithAny(direction, this, entities)) {
          this.x -= moveSpeed;
        }

        break;
    }
  }

  knockback(direction) {
    switch (direction) {
      case 'up':
        this.y -= 14;
        this.currentKnockbackFrame++;
        break;

      case 'right':
        this.x += 14;
        this.currentKnockbackFrame++;
        break;
      
      case 'down':
        this.y += 14;
        this.currentKnockbackFrame++;
        break;

      case 'left':
        this.x -= 14;
        this.currentKnockbackFrame++;
        break;
    }
  }

  hurt(amount) {
    this.stats.hp -= amount;
    console.log(this.stats.hp);
  }
}

export default BasicEnemy;
