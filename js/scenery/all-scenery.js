import Scenery from './scenery';
import { overworld1 } from '../beings/graphics/scenery';

export const calculateScenerySpriteCropData = (spriteSheetX, spriteSheetY, object) => {
  return [
    spriteSheetX, spriteSheetY,
    object.width, object.height,
    object.x, object.y,
    object.width, object.height
  ];
};

export class Tree extends Scenery {
  constructor(x = 0, y = 0) {
    super(x, y);

    this.width = 128;
    this.height = 160;

    this.boundaryX = x + 32;
    this.boundaryY = y + 128;
    this.boundaryWidth = 64;
    this.boundaryHeight = 32;

    this.sprite = overworld1;
    this.spriteCropData = calculateScenerySpriteCropData(832, 224, this);
  }
}

export class Stump extends Scenery {
  constructor(x = 0, y = 0) {
    super(x, y);

    this.width = 64;
    this.height = 64;

    this.boundaryX = this.x;
    this.boundaryY = this.y;
    this.boundaryWidth = this.width;
    this.boundaryHeight = this.height;

    this.sprite = overworld1;
    this.spriteCropData = calculateScenerySpriteCropData(608, 448, this);
  }
}

export class Rock extends Scenery {
  constructor(x = 0, y = 0) {
    super(x, y);

    this.width = 32;
    this.height = 32;

    this.boundaryX = x;
    this.boundaryY = y;
    this.boundaryWidth = this.width;
    this.boundaryHeight = this.height;

    this.sprite = overworld1;
    this.spriteCropData = calculateScenerySpriteCropData(576, 288, this);
  }
}
