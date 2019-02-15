class TitleScreen {
  constructor() {
    this.state = {
      currentOption: 0
    };
  }

  incrementMenuOption() {
    const { currentOption } = this.state;

    if (currentOption === 0) {
      this.state.currentOption++;
    } else {
      this.state.currentOption = 0;
    }
  }

  decrementMenuOption() {
    const { currentOption } = this.state;

    if (currentOption === 1) {
      this.state.currentOption--;
    } else {
      this.state.currentOption = 1;
    }
  }

  titleText() {
    return {
      text: 'Forest Quest',
      x: 75,
      y: 85
    };
  }

  menuText() {
    return {
      play: {
        text: 'Start Game',
        x: 75,
        y: 275
      },

      options: {
        text: 'Options',
        x: 75,
        y: 325
      }
    };
  }
}

export default TitleScreen;
