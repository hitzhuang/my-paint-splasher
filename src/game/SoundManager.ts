import { Howl } from 'howler';
import {
  BG_MUSIC_URL_EASY,
  SFX_URL_FIRE,
  SFX_URL_HIT,
  SfxTypes,
} from './Constant';

class SoundManager {
  bgMusic: Howl;
  fireSFX: Howl;
  hitSFX: Howl;
  muted: boolean;

  constructor() {
    this.muted = false;
    this.fireSFX = new Howl({ src: [SFX_URL_FIRE] });
    this.hitSFX = new Howl({ src: [SFX_URL_HIT] });
    this.bgMusic = new Howl({
      src: [BG_MUSIC_URL_EASY],
      loop: true,
      volume: 0.2,
    });
  }

  playBgMusic(status: string = 'play') {
    switch (status) {
      case 'paused':
        this.bgMusic.pause();
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

  shutdown() {}
}

export default SoundManager;
