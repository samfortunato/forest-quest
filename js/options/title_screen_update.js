import { CurrentGame } from '../engine/setup';
import AudioPlayer from '../audio/audio_player';

export const changeMenuOption = (e) => {
  const { titleScreen } = CurrentGame.states;
  
  switch (e.key) {
    case 'ArrowUp':
      titleScreen.decrementMenuOption();
      AudioPlayer.playSFX('menuOption');
      break;
    case 'ArrowDown':
      titleScreen.incrementMenuOption();
      AudioPlayer.playSFX('menuOption');
      break;
    case 'Enter':
      if (titleScreen.state.currentOption === 0) {
        CurrentGame.setState('PLAYING');
        document.removeEventListener('keydown', changeMenuOption);
      }

      break;
  }
};

export const updateTitleScreen = () => {
  document.addEventListener('keydown', changeMenuOption);
};
