import { ProjectileDefaultRadius, getDistance } from './Constant';
import { CanvasProps } from './GameObject';
import Player from './Player';
import Enemy from './Enemy';
import Particle from './Particle';
import Projectile from './Projectile';

class GameController {
  player: Player;
  projectiles!: Array<Projectile>;
  particles!: Array<Particle>;
  enemies!: Array<Enemy>;
  enemyInterval!: any;
  gameOver!: boolean;
  updateStatus: (status: string, value?: any) => void;
  fireEventListener: any;

  constructor(updateStatus: (status: string, value?: any) => void) {
    this.player = new Player(20, '#ffffff', 10, 100);
    this.reset();
    this.updateStatus = updateStatus;
    this.gameOver = false;
  }

  reset() {
    this.projectiles = [];
    this.enemies = [];
    this.particles = [];
  }

  start() {
    this.fireEventListener = this.fire.bind(this);
    window.addEventListener('click', this.fireEventListener, true);
    this.enemyInterval = this.spawnEnemies();
    this.gameOver = false;
  }

  pause() {
    this.gameOver = true;
    window.removeEventListener('click', this.fireEventListener, true);
    clearInterval(this.enemyInterval);
    this.projectiles.pop(); // can not avoid last click, so remove the last projectitle
  }

  shutdown() {
    this.pause();
    this.reset();
  }

  update(props: CanvasProps) {
    if (this.gameOver) return;

    let ctx = props.ctx;
    if (ctx) {
      ctx.fillStyle = 'rgba(0,0,0,0.1)';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      this.player.update(props);
      this.projectiles.forEach((p: Projectile, index: number) => {
        if (p.toRemove) this.projectiles.splice(index, 1);
        else p.update(props);
      });
      this.enemies.forEach((e: Enemy, index: number) => {
        if (e.isPlayerHit()) this.updateStatus('game_over');
        this.particles = [
          ...this.particles,
          ...e.updateDamaged(this.projectiles, (score) =>
            this.updateStatus('score', score)
          ),
        ];
        if (e.toRemove) this.enemies.splice(index, 1);
        else e.update(props);
      });
      this.particles.forEach((p: Particle, index: number) => {
        if (p.toRemove) this.particles.splice(index, 1);
        else p.update(props);
      });
    }
  }

  offset(x: number, y: number) {
    this.enemies.forEach((e: Enemy) => e.offset(x, y));
    this.projectiles.forEach((p: Projectile) => p.offset(x, y));
    this.particles.forEach((p: Particle) => p.offset(x, y));
  }

  fire(e: MouseEvent) {
    if (this.gameOver) return;

    console.log('fire');

    let dx = e.clientX - this.player.x;
    let dy = e.clientY - this.player.y;
    let dv = getDistance(dx, dy);
    let velocity = { x: (dx / dv) * 5, y: (dy / dv) * 5 };
    this.projectiles.push(
      new Projectile(this.player.x, this.player.y, velocity)
    );
  }

  spawnEnemies() {
    let index = 0;
    return setInterval(() => {
      console.log('enemy');

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
