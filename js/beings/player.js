import Being from './being';
import { wouldCollideWithAny, collisionDetected } from '../util/collision-util';
import { playerSprites } from '../beings/graphics/beings';

import { currentlyPressedKeys } from '../engine/setup';
import entities from './entities';

class Player extends Being {
  constructor(x = 100, y = 100) {
    super(x, y, 42, 56);
    
    this.stats = {
      currentState: 'IDLE',
      
      hp: 3,
      attack: 1
    };
    
    this.speed = 4;
    this.velocity = 1;
    this.facing = 'down';

    this.attacking = false;
    
    this.sprite = playerSprites;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 5;
    this.numberOfFrames = 4;

    this.currentKnockbackFrame = 0;
    this.maxKnockbackFrame = 6;
    this.knockbackDir = '';
  }

  states() {
    return [
      'IDLE',
      'MOVING',
      'HURT',
      'ATTACKING',
      'JUMPING'
    ];
  }

  setState(state) {
    if (this.states().includes(state)) {
      this.stats.currentState = state;
    }
  }

  update() {
    const { currentState } = this.stats;

    const arrowKeysPressedValues = [
      currentlyPressedKeys.ArrowUp,
      currentlyPressedKeys.ArrowRight,
      currentlyPressedKeys.ArrowDown,
      currentlyPressedKeys.ArrowLeft
    ];

    switch (currentState) {
      case 'IDLE':
        if (arrowKeysPressedValues.some(pressed => !!pressed)) {
          this.setState('MOVING');
        }

        break;

      case 'MOVING':
        this.updatePosition();

        if (arrowKeysPressedValues.every(pressed => !pressed)) {
          this.setState('IDLE');
        }

        break;

      case 'HURT':
        if (this.currentKnockbackFrame === 0) {
          this.hurt(1);
          this.knockback(14);
        } else if (this.currentKnockbackFrame > 0 &&
                   this.currentKnockbackFrame < this.maxKnockbackFrame) {
          
          this.knockback(14);
        } else if (this.currentKnockbackFrame >= this.maxKnockbackFrame) {
          this.currentKnockbackFrame = 0;
          this.knockbackDir = '';

          this.setState('IDLE');
        }

        break;

      case 'ATTACKING':
        break;

      case 'JUMPING':
        break;
    }
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

  updatePosition() {
    const gamepad = navigator.getGamepads()[0];
    
    // X = 0
    // Square = 2
    // D Up = 12
    // D Right = 15
    // D Down = 13
    // D Left = 14

    const currentlyPressedButtons = {};

    if (gamepad) {
      currentlyPressedButtons.x = gamepad.buttons[0].pressed;
      currentlyPressedButtons.square = gamepad.buttons[2].pressed;

      currentlyPressedButtons.dUp = gamepad.buttons[12].pressed;
      currentlyPressedButtons.dRight = gamepad.buttons[15].pressed;
      currentlyPressedButtons.dDown = gamepad.buttons[13].pressed;
      currentlyPressedButtons.dLeft = gamepad.buttons[14].pressed;
    } else {
      currentlyPressedButtons.x = false;
      currentlyPressedButtons.square = false;
  
      currentlyPressedButtons.dUp = false;
      currentlyPressedButtons.dRight = false;
      currentlyPressedButtons.dDown = false;
      currentlyPressedButtons.dLeft = false;
    }
    
    if (currentlyPressedKeys.ArrowUp || currentlyPressedButtons.dUp) {
      this.facing = 'up';
      this.animate();
      
      if (!wouldCollideWithAny(this.facing, this, entities)) {
        this.move(this.facing);
      }
    } else if (currentlyPressedKeys.ArrowRight || currentlyPressedButtons.dRight) {
      this.facing = 'right';
      this.animate();

      if (!wouldCollideWithAny(this.facing, this, entities)) {
        this.move(this.facing);
      }
    } else if (currentlyPressedKeys.ArrowDown || currentlyPressedButtons.dDown) {
      this.facing = 'down';
      this.animate();

      if (!wouldCollideWithAny(this.facing, this, entities)) {
        this.move(this.facing);
      }
    } else if (currentlyPressedKeys.ArrowLeft || currentlyPressedButtons.dLeft) {
      this.facing = 'left';
      this.animate();

      if (!wouldCollideWithAny(this.facing, this, entities)) {
        this.move(this.facing);
      }
    }
    
    if (currentlyPressedKeys[' '] ||
        currentlyPressedButtons.x ||
        currentlyPressedButtons.square) {
          
      this.attack(this.facing);
    } else {
      this.attacking = false;
    }
  }

  move(direction, speed) {
    speed = speed || (this.speed * this.velocity);
    
    switch (direction) {
      case 'up':
        this.y -= speed;
        break;
      case 'right':
        this.x += speed;
        break;
      case 'down':
        this.y += speed;
        break;
      case 'left':
        this.x -= speed;
        break;
    }
  }

  knockback(speed) {
    this.move(this.knockbackDir, speed);
    this.currentKnockbackFrame++;
  }

  attack(direction) {
    this.attacking = true;

    const { enemies } = entities.beings;
    const { [direction]: attackBox } = this.attackBox();

    const enemiesThatWereHit = Object.values(enemies).filter((enemy) => {
      return collisionDetected(attackBox, enemy);
    });

    if (enemiesThatWereHit.length !== 0) {
      enemiesThatWereHit.forEach((enemy) => {
        enemy.setState('HURT');
      });
    }
  }

  hurt(amount) {
    this.stats.hp -= amount;
  }
}

export default Player;
