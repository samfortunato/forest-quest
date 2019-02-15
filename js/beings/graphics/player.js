export const playerWalkSprites = new Image();
playerWalkSprites.src = './img/beings/heroes.png';

export const playerAttackSprites = new Image();
playerAttackSprites.src = './img/beings/hero-attacking.png';

class PlayerSprite {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;

    this.spriteSets = {
      idle: playerWalkSprites,
      walk: playerWalkSprites,
      attack: playerAttackSprites,
      jump: playerWalkSprites
    };
    
    this.alpha = 1;
    
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 5;
    this.numberOfFrames = 4;

    this.spriteJumpOffset = 0;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  idleCropData() {
    return {
      up: [[52, 8], [40, 56]],
      right: [[54, 72], [34, 56]],
      down: [[52, 136], [42, 56]],
      left: [[56, 200], [34, 56]]
    };
  }

  walkCropData() {
    return {
      up: [
        [[52, 8], [40, 56]],
        [[4, 8], [44, 54]],
        [[100, 8], [44, 54]]
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

  jumpCropData() {
    return {
      up: [[4, 8], [44, 54]],
      right: [[6, 72], [38, 54]],
      down: [[4, 136], [46, 54]],
      left: [[8, 200], [38, 54]]
    };
  }

  attackCropData() {
    return {
      up: [[24, 4], [46, 74]],
      right: [[28, 78], [58, 52]],
      down: [[24, 132], [46, 68]],
      left: [[4, 206], [64, 52]]
    };
  }

  animateWalk() {
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
}

export default PlayerSprite;
