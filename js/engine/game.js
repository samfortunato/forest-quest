class Game {
  constructor() {
    this._currentState = 'BEFORE_PLAY';
  }

  states() {
    return [
      'BEFORE_PLAY',
      'TITLE_SCREEN',
      'PLAY',
      'MENU'
    ];
  }

  setState(state) {
    if (this.states().includes(state)) {
      this._currentState = state;
    }
  }
}

export default Game;
