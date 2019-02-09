import Scenery from './scenery';
import { overworld1 } from '../beings/graphics/scenery';

class Tree extends Scenery {
  constructor(x = 0, y = 0) {
    super();

    this.x = x;
    this.y = y;
    this.width = 128;
    this.height = 160;

    this.boundaryX = x + 32;
    this.boundaryY = y + 128;
    this.boundaryWidth = 64;
    this.boundaryHeight = 32;

    this.sprite = overworld1;
    this.spriteCropData = [
      832, 224,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height
    ];
  }
}

export default Tree;
