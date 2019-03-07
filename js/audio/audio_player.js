import { CurrentGame } from '../engine/setup';
import { audioPlayer } from '../engine/setup';

class AudioPlayer {
  constructor() {
    this._currentSong = '';
    this._currentSongURL = '';
    this._currentSFX = '';
    this._currentSFXURL = '';
  }

  get currentSong() {
    return this._currentSong;
  }

  get currentSongURL() {
    return this._currentSongURL;
  }

  get currentSFX() {
    return this._currentSFX;
  }

  get currentSFXURL() {
    return this._currentSFXURL;
  }

  changeSong(songURL, title) {
    audioPlayer.music.src = songURL;
    this._currentSong = title;
    this._currentSongURL = songURL;
  }

  changeSFX(sfxURL, name) {
    audioPlayer.sfx1.src = sfxURL;
    this._currentSFX = name;
    this._currentSFXURL = sfxURL;
  }

  playSFX(soundName) {
    const sfx = this.allSFX[soundName];
    
    audioPlayer.sfx1.pause();
    this.changeSFX(sfx.url, sfx.name);
    audioPlayer.sfx1.load();
    audioPlayer.sfx1.play();
  }

  update() {
    switch (CurrentGame.currentState()) {
      case 'ON_TITLE_SCREEN': {
        if (audioPlayer.music.paused) {
          this.changeSong('./audio/music/toby-fox-before-the-story.mp3', 'TITLE_SCREEN');
          audioPlayer.music.src = this.currentSongURL;
          audioPlayer.music.play();
        }

        break;
      }

      case 'PLAYING': {
        if (this.currentSong === 'TITLE_SCREEN') {
          this.changeSong('./audio/music/toby-fox-field-of-hopes-and-dreams.mp3', 'FIELD');
          audioPlayer.music.src = this.currentSongURL;
          audioPlayer.music.play();
        }
      }
    }
  }

  get allSongs() {
    return {
      titleScreen: {
        url: './audio/music/toby-fox-before-the-story.mp3',
        title: 'TITLE_SCREEN'
      },

      field: {
        url: './audio/music/toby-fox-field-of-hopes-and-dreams.mp3',
        title: 'FIELD'
      }
    };
  }

  get allSFX() {
    return {
      menuOption: {
        url: './audio/sfx/menu-option.wav',
        name: 'MENU_OPTION_CHANGE'
      },

      playerJump: {
        url: './audio/sfx/player-jump.wav',
        name: 'PLAYER_JUMP'
      },
      
      playerAttack: {
        url: './audio/sfx/player-attack.wav',
        name: 'PLAYER_ATTACK'
      },

      playerAttackHit: {
        url: './audio/sfx/player-attack-hit.wav',
        name: 'PLAYER_ATTACK_HIT'
      },

      playerHurt: {
        url: './audio/sfx/player-hurt.wav',
        name: 'PLAYER_HURT'
      }
    };
  }
}

export default new AudioPlayer();
