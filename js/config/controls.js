export const initializeControls = (currentlyPressedKeys) => {
  document.addEventListener('keydown', (e) => {
    currentlyPressedKeys[e.key] = true;
  });

  document.addEventListener('keyup', (e) => {
    currentlyPressedKeys[e.key] = false;
  });
};

export const keypressListener = (player, currentlyPressedKeys) => {
  if (currentlyPressedKeys.ArrowUp) {
    player.y -= 3;
  } else if (currentlyPressedKeys.ArrowRight) {
    player.x += 3;
  } else if (currentlyPressedKeys.ArrowDown) {
    player.y += 3;
  } else if (currentlyPressedKeys.ArrowLeft) {
    player.x -= 3;
  }
};
