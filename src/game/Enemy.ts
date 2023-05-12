import { gsap } from 'gsap';
import {
  ProjectileDefaultRadius,
  SfxTypes,
  getDistance,
  hitExtraScore,
  hitScore,
} from './Constant';
import Player from './Player';
import Projectile, { IVelocity } from './Projectile';
import Particle from './Particle';
import SoundManager from './SoundManager';
import HitScore from './HitScore';

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
    soundMgr: SoundManager,
    projectiles: Array<Projectile>,
    scoreBonus: number,
    updateScore: (score: number) => void
  ) {
    let particles: Array<Particle> = [];
    projectiles.forEach((p: Projectile) => {
      let dx = this.x - p.x;
      let dy = this.y - p.y;
      let dv = getDistance(dx, dy);
      if (dv <= this.radius + p.radius) {
        // play sound effect and mark to be removed
        soundMgr.playSFX(SfxTypes.HIT);
        p.toRemove = true;

        // enemy shrinked
        let radius = this.radius;
        let score = scoreBonus;
        radius -= p.radius * 2.5;
        if (radius > 0) {
          score += hitScore;
          updateScore(score);
        } else {
          score += hitExtraScore;
          updateScore(score);
          radius = 0;
        }
        gsap.to(this, { radius });

        // particle effects
        let strength = (Math.random() * this.radius) / 2;
        if (strength < 5) strength = 10;
        else if (strength > 24) strength = 24;
        for (let i = 0; i < strength; i++) {
          let velocity = {
            x: (Math.random() - 0.5) * 8,
            y: (Math.random() - 0.5) * 8,
          };
          let radius = Math.random() * 3;
          let particle = new Particle(p.x, p.y, velocity, this.color, radius);
          if (i === 0) {
            particle.hitScore = new HitScore(p.x, p.y, p.color, score);
          }
          particles.push(particle);
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
