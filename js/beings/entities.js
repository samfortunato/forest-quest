import Player from '../beings/player';
import BasicEnemy from '../beings/basic-enemy';
import Boundary from '../scenery/boundary';
import Tree from '../scenery/tree';
import Rock from '../scenery/rock';

const entities = {
  player: new Player(),
  basicEnemy: new BasicEnemy(),

  boundaries: {
    tree1: new Tree(224, -96),
    tree2: new Tree(352, 64),
    tree3: new Tree(480, 0),
    tree4: new Tree(608, 32),
    tree5: new Tree(736, 64),
    tree6: new Tree(896, 0),
    tree7: new Tree(64, 160),
    rock1: new Rock(160, 160)
  },
};

export default entities;
