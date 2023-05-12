import { CanvasProps } from './GameObject';
import HitScore from './HitScore';
import Projectile, { IVelocity } from './Projectile';

class Particle extends Projectile {
  alpha: number;
  hitScore?: HitScore;

  constructor(
    x: number,
    y: number,
    velocity: IVelocity,
    color: string,
    radius: number,
    hitScore?: HitScore
  ) {
    super(x, y, velocity, color, radius);
    this.alpha = 1;
    this.hitScore = hitScore ?? undefined;
  }

  draw(props: CanvasProps): void {
    let { ctx } = props;
    if (ctx) {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      super.draw(props);
      ctx.restore();
    }
  }

  update(props: CanvasProps): void {
    this.velocity.x *= 0.98;
    this.velocity.y *= 0.98;
    this.alpha -= 0.01;
    if (this.alpha < 0) this.alpha = 0;
    this.hitScore?.update(props);
    super.update(props);
  }

  checkToRemove() {
    if (this.alpha <= 0) this.toRemove = true;
  }
}

export default Particle;
