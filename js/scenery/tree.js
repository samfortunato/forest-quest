import Scenery from './scenery';
import { treeSprite } from '../beings/graphics/scenery';

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

    this.sprite = treeSprite;
  }
}

export default Tree;
