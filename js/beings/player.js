import Being from './being';
import PlayerSprite from './graphics/player';

import { wouldCollideWithAny, collisionDetected } from '../util/collision-util';
import { currentlyPressedKeys } from '../engine/setup';
import entities from './entities';

import AudioPlayer from '../audio/audio_player';

class Player extends Being {
  constructor(x = 100, y = 100) {
    super(x, y, 42, 56);
    
    this.speed = 4;
    this.facing = 'down';
    
    this.groundVelocity = 1;
    this.zVelocity = 0;
    this.grounded = true;
    
    this.stats = {
      currentState: 'IDLE',
      
      hp: 3,
      attack: 1,
      invincible: false
    };

    this.knockbackFrames = {
      currentFrame: 0,
      maxFrame: 6,
      direction: ''
    };

    this.attackFrames = {
      currentFrame: 0,
      maxFrame: 10
    };

    this.sprite = new PlayerSprite(this.x, this.y);
  }

  possibleStates() {
    return [
      'IDLE',
      'MOVING',
      'HURT',
      'ATTACKING',
      'JUMPING'
    ];
  }

  setState(state) {
    if (this.possibleStates().includes(state)) {
      this.stats.currentState = state;
    }
  }

  update() {
    const { currentState } = this.stats;
    const gamepad = navigator.getGamepads()[0];

    const movementKeys = {
      move: [
        currentlyPressedKeys.ArrowUp,
        currentlyPressedKeys.ArrowRight,
        currentlyPressedKeys.ArrowDown,
        currentlyPressedKeys.ArrowLeft,
      ],
      attack: [
        currentlyPressedKeys[' '],
      ],
      jump: [
        currentlyPressedKeys.Shift
      ]
    };

    if (gamepad) {
      movementKeys.move.push(
        gamepad.buttons[12].pressed, // dUp
        gamepad.buttons[15].pressed, // dRight
        gamepad.buttons[13].pressed, // dDown
        gamepad.buttons[14].pressed // dLeft
      );

      movementKeys.attack.push(
        gamepad.buttons[0].pressed, // x
        gamepad.buttons[2].pressed // square
      );

      movementKeys.jump.push(
        gamepad.buttons[1].pressed, // o
        gamepad.buttons[3].pressed // triangle
      );
    }

    switch (currentState) {
      case 'IDLE':
        if (movementKeys.move.some(pressed => !!pressed)) {
          this.setState('MOVING');
        } else if (movementKeys.attack.some(pressed => !!pressed)) {
          this.setState('ATTACKING');
        } else if (movementKeys.jump.some(pressed => !!pressed)) {
          this.setState('JUMPING');
        }

        break;

      case 'MOVING':
        this.updatePosition();

        if (movementKeys.move.every(pressed => !pressed)) {
          this.setState('IDLE');
        } else if (movementKeys.jump.some(pressed => !!pressed)) {
          this.setState('JUMPING');
        } else if (movementKeys.attack.some(pressed => !!pressed)) {
          this.setState('ATTACKING');
        }

        break;

      case 'HURT':
        if (this.knockbackFrames.currentFrame === 0) {
          this.hurt(1);
          this.knockback(14);

          AudioPlayer.playSFX('playerHurt');
        } else if (this.knockbackFrames.currentFrame > 0 &&
                   this.knockbackFrames.currentFrame < this.knockbackFrames.maxFrame) {
          
          this.knockback(14);
        } else if (this.knockbackFrames.currentFrame >= this.knockbackFrames.maxFrame) {
          this.knockbackFrames.currentFrame = 0;
          this.knockbackFrames.direction = '';

          this.setState('IDLE');
        }

        break;

      case 'ATTACKING':
        if (this.attackFrames.currentFrame === 0) {
          this.attack(this.facing);
          this.attackFrames.currentFrame++;

          AudioPlayer.playSFX('playerAttack');
        } else if (this.attackFrames.currentFrame > 0 &&
                this.attackFrames.currentFrame < this.attackFrames.maxFrame) {

          this.attack(this.facing);
          this.attackFrames.currentFrame++;
        } else if (this.attackFrames.currentFrame >= this.attackFrames.maxFrame) {
          this.attackFrames.currentFrame = 0;
          this.setState('IDLE');
        }
        
        break;

      case 'JUMPING':
        if (this.grounded) {
          this.grounded = false;
          this.zVelocity = 4;
          
          AudioPlayer.playSFX('playerJump');

          this.updatePosition();
          this.jump();

        } else if (this.zVelocity > -4.1) {
          this.updatePosition();
          this.jump();
          
        } else if (this.zVelocity <= -4.1) {
          this.grounded = true;
          this.zVelocity = 0;
          // this.sprite.y = Math.floor(this.sprite.y) - 1;

          this.setState('IDLE');
        }

        break;
    }
  }

  attackBox() {
    return {
      up: {
        x: (this.x + 5),
        y: (this.y - (this.height / 2) + 6),
        width: 42,
        height: 28
      },
      right: {
        x: (this.x + this.width) - 8,
        y: (this.y + 20),
        width: 22,
        height: 42 
      },
      down: {
        x: (this.x - 5),
        y: (this.y + this.height - 12),
        width: this.width,
        height: (this.height / 2)
      },
      left: {
        x: (this.x - this.width + 15),
        y: (this.y + 20),
        width: 24,
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

    const currentlyPressedButtons = {
      x: false,
      square: false,
      dUp: false,
      dRight: false,
      dDown: false,
      dLeft: false
    };

    if (gamepad) {
      currentlyPressedButtons.x = gamepad.buttons[0].pressed;
      currentlyPressedButtons.square = gamepad.buttons[2].pressed;

      currentlyPressedButtons.dUp = gamepad.buttons[12].pressed;
      currentlyPressedButtons.dRight = gamepad.buttons[15].pressed;
      currentlyPressedButtons.dDown = gamepad.buttons[13].pressed;
      currentlyPressedButtons.dLeft = gamepad.buttons[14].pressed;
    }
    
    if (currentlyPressedKeys.ArrowUp || currentlyPressedButtons.dUp) {
      this.facing = 'up';
      this.move(this.facing);
    } else if (currentlyPressedKeys.ArrowRight || currentlyPressedButtons.dRight) {
      this.facing = 'right';
      this.move(this.facing);
    } else if (currentlyPressedKeys.ArrowDown || currentlyPressedButtons.dDown) {
      this.facing = 'down';
      this.move(this.facing);
    } else if (currentlyPressedKeys.ArrowLeft || currentlyPressedButtons.dLeft) {
      this.facing = 'left';
      this.move(this.facing);
    }
  }

  move(direction, speed) {
    speed = speed || (this.speed * this.groundVelocity);
    
    switch (direction) {
      case 'up':
        if (!wouldCollideWithAny(direction, this, entities)) {
          this.y -= (speed);
        }

        break;
      case 'right':
        if (!wouldCollideWithAny(direction, this, entities)) {
          this.x += speed;
        }

        break;
      case 'down':
        if (!wouldCollideWithAny(direction, this, entities)) {
          this.y += speed;
        }
        
        break;
      case 'left':
        if (!wouldCollideWithAny(direction, this, entities)) {
          this.x -= speed;
        }

        break;
    }
  }

  jump() {
    this.zVelocity -= 0.3;
  }

  knockback(speed) {
    this.move(this.knockbackFrames.direction, speed);
    this.knockbackFrames.currentFrame++;
  }

  attack(direction) {
    const { enemies } = entities.beings;
    const { [direction]: attackBox } = this.attackBox();

    const enemiesThatWereHit = Object.values(enemies).filter((enemy) => {
      return collisionDetected(attackBox, enemy);
    });

    if (enemiesThatWereHit.length !== 0) {
      enemiesThatWereHit.forEach((enemy) => {
        AudioPlayer.playSFX('playerAttackHit');
        enemy.setState('HURT');
      });
    }
  }

  hurt(amount) {
    this.stats.hp -= amount;
    console.log(this.stats.hp);

    this.stats.invincible = true;

    setTimeout(() => {
      this.stats.invincible = false;
    }, 1000);
  }
}

export default Player;
