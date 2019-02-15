import { CurrentGame } from '../engine/setup';

export const changeMenuOption = (e) => {
  const { titleScreen } = CurrentGame.states;
  
  switch (e.key) {
    case 'ArrowUp':
      titleScreen.decrementMenuOption();
      break;
    case 'ArrowDown':
      titleScreen.incrementMenuOption();
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
