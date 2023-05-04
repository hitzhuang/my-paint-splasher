import { gsap } from 'gsap';
import {
  ProjectileDefaultRadius,
  getDistance,
  hitExtraScore,
  hitScore,
} from './Constant';
import Player from './Player';
import Projectile, { IVelocity } from './Projectile';
import Particle from './Particle';

class Enemy extends Projectile {
  player: Player;
  particles: Array<Particle>;

  constructor(
    player: Player,
    x: number,
    y: number,
    velocity: IVelocity,
    color: string = '#ffffff',
    radius: number = ProjectileDefaultRadius,
    toRemove: boolean = false
  ) {
    super(x, y, velocity, color, radius, toRemove);
    this.player = player;
    this.particles = [];
  }

  isPlayerHit() {
    let dv = getDistance(this.x - this.player.x, this.y - this.player.y);
    if (dv <= this.radius + this.player.radius) return true;
    return false;
  }

  updateDamaged(
    projectiles: Array<Projectile>,
    updateScore: (score: number) => void
  ) {
    let particles: Array<Particle> = [];
    projectiles.forEach((p: Projectile) => {
      let dx = this.x - p.x;
      let dy = this.y - p.y;
      let dv = getDistance(dx, dy);
      if (dv <= this.radius + p.radius) {
        // mark to be removed
        p.toRemove = true;

        // enemy shrink
        let radius = this.radius;
        radius -= p.radius * 2.5;
        if (radius > 0) updateScore(hitScore);
        else {
          updateScore(hitExtraScore);
          radius = 0;
        }
        gsap.to(this, { radius });

        // particle effects
        let strength = (Math.random() * this.radius) / 2;
        if (strength < 5) strength = 5;
        else if (strength > 12) strength = 12;
        for (let i = 0; i < strength; i++) {
          let velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8,
          };
          let radius = Math.random() * 3;
          particles.push(new Particle(p.x, p.y, velocity, this.color, radius));
        }
      }
    });
    return particles;
  }

  checkToRemove() {
    if (this.isPlayerHit() || this.radius <= ProjectileDefaultRadius) {
      this.toRemove = true;
    }
  }
}

export default Enemy;
