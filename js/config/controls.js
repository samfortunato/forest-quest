export const initializeControls = (currentlyPressedKeys) => {
  document.addEventListener('keydown', (e) => {
    currentlyPressedKeys[e.key] = true;
  });

  document.addEventListener('keyup', (e) => {
    currentlyPressedKeys[e.key] = false;
  });
};
