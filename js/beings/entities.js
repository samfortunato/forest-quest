import Player from '../beings/player';
import BasicEnemy from '../beings/basic-enemy';
import * as AllScenery from '../scenery/all-scenery';

const entities = {
  beings: {
    friendlies: {
      player: new Player()
    },

    enemies: {
      basicEnemy: new BasicEnemy(700, 250),
      basicEnemy2: new BasicEnemy(600, 500),
      basicEnemy3: new BasicEnemy(400, 1200),
      basicEnemy4: new BasicEnemy(200, 2000),
      basicEnemy5: new BasicEnemy(2000, 250),
      basicEnemy6: new BasicEnemy(1000, 250),
      basicEnemy7: new BasicEnemy(1500, 250),
      basicEnemy8: new BasicEnemy(250, 1500),
      basicEnemy9: new BasicEnemy(2500, 1500),
      basicEnemy10: new BasicEnemy(4000, 1500),
      basicEnemy11: new BasicEnemy(900, 1200),
      basicEnemy12: new BasicEnemy(400, 1300),
      basicEnemy13: new BasicEnemy(500, 1350),
      basicEnemy14: new BasicEnemy(250, 1450),
      basicEnemy15: new BasicEnemy(200, 1250),
      basicEnemy16: new BasicEnemy(2180, 950),
      basicEnemy17: new BasicEnemy(1800, 420),
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
    tree8: new AllScenery.Tree(100, 300),
    stump1: new AllScenery.Stump(640, 416)
  },
};

export default entities;
