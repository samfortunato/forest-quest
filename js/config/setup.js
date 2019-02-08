export const setup = (canvasEl) => {
  canvasEl.width = 800;
  canvasEl.height = 608;
  canvasEl.style.backgroundImage = 'url(./img/backgrounds/grass.png)';
};

export const initializeControls = (currentlyPressedKeys) => {
  document.addEventListener('keydown', (e) => {
    currentlyPressedKeys[e.key] = true;
  });

  document.addEventListener('keyup', (e) => {
    currentlyPressedKeys[e.key] = false;
  });
};
