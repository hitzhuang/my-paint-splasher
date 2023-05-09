import { Howl } from 'howler';
import {
  BG_MUSIC_URL_1,
  BG_MUSIC_URL_2,
  BG_MUSIC_URL_3,
  GAME_DIFFICULTY,
  GAME_MUTED,
  SFX_URL_FIRE,
  SFX_URL_HIT,
  SfxTypes,
  getGameMuted,
} from './Constant';

class SoundManager {
  bgMusic!: Howl;
  fireSFX: Howl;
  hitSFX: Howl;
  muted: boolean;
  gameLevel!: string;

  constructor() {
    this.muted = getGameMuted();
    this.fireSFX = new Howl({ src: [SFX_URL_FIRE], volume: 0.5 });
    this.hitSFX = new Howl({ src: [SFX_URL_HIT], volume: 0.5 });
    let difficulty = localStorage.getItem(GAME_DIFFICULTY);
    this.setLevel(difficulty ?? 'moderate');
  }

  mute(muted: boolean) {
    this.muted = muted;
    this.bgMusic.mute(muted);
    localStorage.setItem(GAME_MUTED, muted.toString());
  }

  setLevel(level: string = 'moderate') {
    this.gameLevel = level;
    switch (level) {
      case 'easy':
        this.bgMusic = new Howl({
          src: [BG_MUSIC_URL_1],
          loop: true,
          volume: 0.3,
        });
        break;
      case 'challenging':
        this.bgMusic = new Howl({
          src: [BG_MUSIC_URL_3],
          loop: true,
          volume: 0.3,
        });
        break;
      default:
        this.bgMusic = new Howl({
          src: [BG_MUSIC_URL_2],
          loop: true,
          volume: 0.3,
        });
        break;
    }
  }

  playBgMusic(status: string = 'play') {
    if (this.muted) return;
    if (!this.bgMusic) return;
    switch (status) {
      case 'paused':
        this.bgMusic.mute(true);
        break;
      case 'continue':
        this.bgMusic.mute(false);
        break;
      case 'stop':
        this.bgMusic.stop();
        break;
      default:
        this.bgMusic.play();
        break;
    }
  }

  playSFX(type: string) {
    if (this.muted) return;
    switch (type) {
      case SfxTypes.FIRE:
        this.fireSFX.play();
        break;
      case SfxTypes.HIT:
        this.hitSFX.play();
        break;
    }
  }

  shutdown() {
    this.bgMusic.unload();
    this.fireSFX.unload();
    this.hitSFX.unload();
  }
}

export default SoundManager;
