import { CurrentGame } from '../engine/setup';

const titleScreenBG = new Image();
titleScreenBG.src = './img/backgrounds/title-screen.png';

export const drawTitleScreen = (ctx) => {
  const { titleScreen } = CurrentGame.states;

  ctx.clearRect(0, 0, 800, 608);

  ctx.drawImage(titleScreenBG, 0, 0);

  const [titleText, menuText] = [
    titleScreen.titleText(),
    titleScreen.menuText()
  ];

  ctx.font = '4rem Titillium Web';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#fff';
  ctx.shadowColor = 'rgba(0, 0, 0, 1)';
  ctx.shadowBlur = 50;
  ctx.fillText(titleText.text, titleText.x, titleText.y);

  ctx.font = '2rem Titillium Web';
  ctx.fillText(menuText.play.text, menuText.play.x, menuText.play.y);
  ctx.fillText(menuText.options.text, menuText.options.x, menuText.options.y);

  switch (titleScreen.state.currentOption) {
    case 0:
      ctx.fillRect(50, 308, 10, 10);
      break;
    case 1:
      ctx.fillRect(50, 358, 10, 10);
  }

  ctx.shadowColor = 'transparent';
};
