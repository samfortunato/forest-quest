import TitleScreen from '../options/title_screen';

class Game {
  constructor() {
    this._currentState = 'ON_TITLE_SCREEN';
    
    this.states = {
      titleScreen: new TitleScreen()
    };
  }

  possibleStates() {
    return [
      'BEFORE_PLAY',
      'ON_TITLE_SCREEN',
      'PLAYING',
      'MENU_OPEN'
    ];
  }

  currentState() {
    return this._currentState;
  }

  setState(state) {
    if (this.possibleStates().includes(state)) {
      this._currentState = state;
    }
  }
}

export default Game;
