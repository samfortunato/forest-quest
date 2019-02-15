import { CurrentGame } from '../engine/setup';
const { titleScreen } = CurrentGame.states;

export const changeMenuOption = (e) => {  
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

let menuWait = 0;

export const updateTitleScreen = () => {
  document.addEventListener('keydown', changeMenuOption);

  const gamepad = navigator.getGamepads()[0];

  if (gamepad) {
    if (gamepad.buttons[12].pressed && menuWait === 0) {
      titleScreen.decrementMenuOption();
      menuWait++;
    } else if (gamepad.buttons[13].pressed && menuWait === 0) {
      titleScreen.incrementMenuOption();
      menuWait++;
    } else if (gamepad.buttons[0].pressed &&
               titleScreen.state.currentOption === 0) {
      
      CurrentGame.setState('PLAYING');
      document.removeEventListener('keydown', changeMenuOption);
    }
  }
  
  if (menuWait !== 0 && menuWait < 10) {
    menuWait++;
  } else if (menuWait >= 10) {
    menuWait = 0;
  }
};
