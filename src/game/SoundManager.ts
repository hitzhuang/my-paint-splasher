export const SfxTypes = {
  fire: 'fire',
  hit: 'hit',
};

class SoundManager {
  // backgroundMusic: HTMLAudioElement;
  fireSFX: HTMLAudioElement;
  hitSFX: HTMLAudioElement;
  muted: boolean;

  constructor() {
    this.muted = false;
    this.fireSFX = new Audio(process.env.PUBLIC_URL + '/assets/fire.mp3');
    this.fireSFX.load();
    this.hitSFX = new Audio(process.env.PUBLIC_URL + '/assets/hit.mp3');
    this.hitSFX.load();
  }

  playSFX(type: string) {
    if (this.muted) return;

    let sfx: any = null;
    switch (type) {
      case SfxTypes.fire:
        sfx = this.fireSFX.cloneNode();
        break;
      case SfxTypes.hit:
        sfx = this.hitSFX.cloneNode();
        break;
    }
    if (sfx) sfx.play();
  }

  shutdown() {}
}

export default SoundManager;
