import Scenery from './scenery';
import { overworld1 } from '../beings/graphics/scenery';

class Rock extends Scenery {
  constructor(x = 0, y = 0) {
    super();

    this.x = x;
    this.y = y;
    this.width = 32;
    this.height = 32;

    this.boundaryX = x;
    this.boundaryY = y;
    this.boundaryWidth = this.width;
    this.boundaryHeight = this.height;

    this.sprite = overworld1;
    this.spriteCropData = [
      576, 288,
      this.width, this.height,
      this.x, this.y,
      this.width, this.height
    ];
  }
}

export default Rock;
