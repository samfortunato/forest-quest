export const playerSprites = new Image();
playerSprites.src = './img/beings/heroes.png';

export const playerAttackSprites = new Image();
playerAttackSprites.src = './img/beings/hero-attacking.png';

class PlayerSprite {
  constructor() {
    this.sprite = playerSprites;
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;

    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = 5;
    this.numberOfFrames = 4;
    this.alpha = 1;
  }

  setSpritePosition(x, y) {
    this.spritePosition.x = x;
    this.spritePosition.y = y;
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

  attackSpriteCropData() {
    return {
      up: [
        [26, 2], [44, 74]
      ],
      right: [
        [28, 78], [58, 52]
      ],
      down: [
        [24, 132], [46, 68]
      ],
      left: [
        [4, 206], [64, 52]
      ]
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
