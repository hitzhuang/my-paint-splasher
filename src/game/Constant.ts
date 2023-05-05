export const ProjectileDefaultRadius = 8;
export const GAME_HIGH_SCORE = 'shooter-game-highscore';

export const hitScore = 100;
export const hitExtraScore = 150;
export const SfxTypes = {
  FIRE: 'fire',
  HIT: 'hit',
};
export const SFX_URL_FIRE = process.env.PUBLIC_URL + '/assets/fire.mp3';
export const SFX_URL_HIT = process.env.PUBLIC_URL + '/assets/hit.mp3';
export const BG_MUSIC_URL_EASY = process.env.PUBLIC_URL + '/assets/easy.mp3';

export const getDistance = (dx: number, dy: number) =>
  Math.sqrt(dx * dx + dy * dy);
