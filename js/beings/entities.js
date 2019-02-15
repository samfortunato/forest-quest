import Player from '../beings/player';
import BasicEnemy from '../beings/basic-enemy';
import * as AllScenery from '../scenery/all-scenery';

const entities = {
  beings: {
    friendlies: {
      player: new Player()
    },

    enemies: {
      basicEnemy: new BasicEnemy()
    }
  },
  
  boundaries: {
    rock1: new AllScenery.Rock(160, 160),
    tree1: new AllScenery.Tree(224, -96),
    tree2: new AllScenery.Tree(352, -64),
    tree3: new AllScenery.Tree(480, 0),
    tree4: new AllScenery.Tree(608, -64),
    tree5: new AllScenery.Tree(736, 64),
    tree6: new AllScenery.Tree(896, 0),
    tree7: new AllScenery.Tree(64, 160),
    // tree8: new AllScenery.Tree(300, 300),
    stump1: new AllScenery.Stump(640, 416)
  },
};

export default entities;
