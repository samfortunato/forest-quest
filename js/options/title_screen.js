import AudioPlayer from '../audio/audio_player';

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

    AudioPlayer.playSFX('menuOption');
  }

  decrementMenuOption() {
    const { currentOption } = this.state;

    if (currentOption === 1) {
      this.state.currentOption--;
    } else {
      this.state.currentOption = 1;
    }

    AudioPlayer.playSFX('menuOption');
  }

  titleText() {
    return {
      text: 'Forest Quest',
      x: 75,
      y: 200
    };
  }

  menuText() {
    return {
      play: {
        text: 'Start Game',
        x: 75,
        y: 300
      },

      options: {
        text: 'Options',
        x: 75,
        y: 350
      }
    };
  }
}

export default TitleScreen;
