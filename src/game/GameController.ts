import {
  GAME_HIGH_SCORE,
  ProjectileDefaultRadius,
  SfxTypes,
  getDistance,
} from './Constant';
import { CanvasProps } from './GameObject';
import Player from './Player';
import Enemy from './Enemy';
import Particle from './Particle';
import Projectile from './Projectile';
import SoundManager from './SoundManager';

class GameController {
  player: Player;
  score!: number;
  highScore!: number;
  projectiles!: Array<Projectile>;
  particles!: Array<Particle>;
  enemies!: Array<Enemy>;
  enemyInterval!: any;
  gamePaused!: boolean;
  updateStatus: (status: string) => void;
  fireEventListener: any;
  soundMgr: SoundManager;

  constructor(updateStatus: (status: string) => void) {
    this.soundMgr = new SoundManager();
    this.player = new Player(20, '#ffffff', 10, 100);
    this.reset();
    this.updateStatus = updateStatus;
    this.gamePaused = false;
  }

  reset() {
    this.highScore = parseInt(localStorage.getItem(GAME_HIGH_SCORE) ?? '0');
    this.projectiles = [];
    this.enemies = [];
    this.particles = [];
  }

  start() {
    this.score = 0;
    this.soundMgr.playBgMusic();
    this.reset();
    this.continue();
    this.updateStatus('restart');
  }

  continue() {
    this.fireEventListener = this.fire.bind(this);
    document
      .getElementById('canvas')
      ?.addEventListener('click', this.fireEventListener, true);
    this.enemyInterval = this.spawnEnemies();
    this.gamePaused = false;
    this.soundMgr.playBgMusic('continue');
    this.updateStatus('continue');
  }

  paused() {
    document
      .getElementById('canvas')
      ?.removeEventListener('click', this.fireEventListener, true);
    this.soundMgr.playBgMusic('paused');
    this.gamePaused = true;
    clearInterval(this.enemyInterval);
    this.updateStatus('paused');
  }

  shutdown() {
    if (this.highScore < this.score) {
      localStorage.setItem(GAME_HIGH_SCORE, this.score.toString());
    }
    this.paused();
    this.reset();
    this.soundMgr.playBgMusic('stop');
    this.updateStatus('game_shutdown');
  }

  selectPlayerColor(color: string) {
    this.player.color = color;
    this.soundMgr.playSFX(SfxTypes.FIRE);
  }

  update(props: CanvasProps) {
    if (this.gamePaused) return;

    let ctx = props.ctx;
    if (ctx) {
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      this.player.update(props);
      this.projectiles.forEach((projectile: Projectile, index: number) => {
        if (projectile.toRemove) this.projectiles.splice(index, 1);
        else projectile.update(props);
      });
      this.enemies.forEach((enemy: Enemy, index: number) => {
        if (enemy.isPlayerHit()) {
          this.updateStatus('game_over');
          this.shutdown();
        }
        this.particles = [
          ...this.particles,
          ...enemy.updateDamaged(this.soundMgr, this.projectiles, (score) => {
            this.score += score;
            this.updateStatus(this.score.toString());
          }),
        ];
        if (enemy.toRemove) this.enemies.splice(index, 1);
        else enemy.update(props);
      });
      this.particles.forEach((particle: Particle, index: number) => {
        if (particle.toRemove) this.particles.splice(index, 1);
        else particle.update(props);
      });
    }
  }

  offset(x: number, y: number) {
    this.enemies.forEach((e: Enemy) => e.offset(x, y));
    this.projectiles.forEach((p: Projectile) => p.offset(x, y));
    this.particles.forEach((p: Particle) => p.offset(x, y));
  }

  fire(e: MouseEvent) {
    if (this.gamePaused) return;

    let dx = e.clientX - this.player.x;
    let dy = e.clientY - this.player.y;
    let dv = getDistance(dx, dy);
    let velocity = { x: (dx / dv) * 5, y: (dy / dv) * 5 };
    this.soundMgr.playSFX(SfxTypes.FIRE);
    this.projectiles.push(
      new Projectile(this.player.x, this.player.y, velocity, this.player.color)
    );
  }

  spawnEnemies() {
    let index = 0;
    return setInterval(() => {
      // console.log('enemy');

      let x = 0;
      let y = 0;
      // spawn enemies from four different boundaries.
      switch (index) {
        case 0:
          // x = 0, y = 0 ~ canvas height
          y = Math.random() * (this.player.y * 2);
          break;
        case 1:
          // x = canvas width, y = 0 ~ canvas height
          x = this.player.x * 2;
          y = Math.random() * (this.player.y * 2);
          break;
        case 2:
          // x = 0 ~ canvas width, y = 0
          x = Math.random() * (this.player.x * 2);
          break;
        default:
          // x = 0 ~ canvas width, y = canvas height
          x = Math.random() * (this.player.x * 2);
          y = this.player.y * 2;
          break;
      }
      let dx = x - this.player.x;
      let dy = y - this.player.y;
      let dv = getDistance(dx, dy);
      let velocity = { x: (dx / dv) * -1, y: (dy / dv) * -1 };
      let color = `hsl(${Math.random() * 360}, 60%, 60%)`;
      let radius = Math.floor(
        Math.random() * (this.player.radius * 3 - ProjectileDefaultRadius) +
          ProjectileDefaultRadius
      );
      this.enemies.push(new Enemy(this.player, x, y, velocity, color, radius));
      index = index + 1 >= 4 ? 0 : index + 1;
    }, 1500);
  }
}

export default GameController;
