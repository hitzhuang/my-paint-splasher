export const ProjectileDefaultRadius = 8;
export const GAME_HIGH_SCORE = 'shooter-game-highscore';
export const GAME_MUTED = 'shooter-game-muted';
export const GAME_DIFFICULTY = 'shooter-game-difficulty';

export const hitScore = 100;
export const hitExtraScore = 150;
export const SfxTypes = {
  FIRE: 'fire',
  HIT: 'hit',
};
export const GameLevelProps: any = {
  easy: {
    spawnTime: 1500,
    velocity: -0.8,
    bonus: -100,
  },
  moderate: {
    spawnTime: 1200,
    velocity: -1,
    bonus: 0,
  },
  challenging: {
    spawnTime: 500,
    velocity: -1,
    bonus: 100,
  },
};
export const SFX_URL_FIRE = process.env.PUBLIC_URL + '/assets/fire.mp3';
export const SFX_URL_HIT = process.env.PUBLIC_URL + '/assets/hit.mp3';
export const BG_MUSIC_URL_1 = process.env.PUBLIC_URL + '/assets/easy.mp3';
export const BG_MUSIC_URL_2 = process.env.PUBLIC_URL + '/assets/moderate.mp3';
export const BG_MUSIC_URL_3 =
  process.env.PUBLIC_URL + '/assets/challenging.mp3';

export const getDistance = (dx: number, dy: number) =>
  Math.sqrt(dx * dx + dy * dy);

export const getGameMuted = () => {
  let muted = true;
  let gameMuted = localStorage.getItem(GAME_MUTED);
  if (!gameMuted || gameMuted === 'true') muted = true;
  else muted = false;
  return muted;
};
