// import SFX_FIRE from '../assets/fire.mp3';
// import SFX_HIT from '../assets/hit.mp3';
// import BG_MUSIC_EASY from '../assets/easy.mp3';

export const SfxTypes = {
  fire: 'fire',
  hit: 'hit',
};

const SFX_URL_FIRE = process.env.PUBLIC_URL + '/assets/fire.mp3';
const SFX_URL_HIT = process.env.PUBLIC_URL + '/assets/hit.mp3';
const BG_MUSIC_URL_EASY = process.env.PUBLIC_URL + '/assets/easy.mp3';
const SFX_CHANNELS = 8;

class SoundManager {
  bgMusic: HTMLAudioElement;
  fireSFX: HTMLAudioElement[];
  fireIndex: number;
  hitSFX: HTMLAudioElement[];
  hitIndex: number;
  // sfx: HTMLAudioElement | null;
  muted: boolean;

  constructor() {
    this.muted = false;
    this.bgMusic = new Audio(BG_MUSIC_URL_EASY);
    this.bgMusic.load();
    this.bgMusic.volume = 0.1;

    this.fireIndex = 0;
    this.hitIndex = 0;
    this.fireSFX = [];
    this.hitSFX = [];
    for (let i = 0; i < SFX_CHANNELS; i++) {
      this.fireSFX.push(this.loadAudio(SFX_URL_FIRE));
      this.hitSFX.push(this.loadAudio(SFX_URL_HIT));
    }
  }

  loadAudio(url: string) {
    let audio = new Audio(url);
    audio.load();
    return audio;
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
      case SfxTypes.fire:
        this.fireSFX[this.fireIndex++].play();
        this.fireIndex = this.fireIndex === SFX_CHANNELS ? 0 : this.fireIndex;
        break;
      case SfxTypes.hit:
        this.hitSFX[this.hitIndex++].play();
        this.hitIndex = this.hitIndex === SFX_CHANNELS ? 0 : this.hitIndex;
        break;
    }
  }

  shutdown() {}
}

export default SoundManager;
