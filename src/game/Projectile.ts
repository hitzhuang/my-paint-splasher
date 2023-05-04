import { ProjectileDefaultRadius } from './Constant';
import GameObject, { CanvasProps } from './GameObject';

export interface IVelocity {
  x: number;
  y: number;
}

class Projectile extends GameObject {
  radius: number;
  velocity: IVelocity;
  toRemove: boolean;

  constructor(
    x: number,
    y: number,
    velocity: IVelocity,
    color: string = '#ffffff',
    radius: number = ProjectileDefaultRadius,
    toRemove: boolean = false
  ) {
    super(x, y, color);
    this.radius = radius;
    this.velocity = velocity;
    this.toRemove = toRemove;
  }

  draw(props: CanvasProps) {
    let { ctx } = props;
    if (ctx) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
      ctx.fill();
    }
  }

  checkToRemove(width: number, height: number) {
    if (
      this.x + this.radius <= 0 ||
      this.y + this.radius <= 0 ||
      this.x - this.radius > width ||
      this.y - this.radius > height
    ) {
      this.toRemove = true;
    }
  }

  update(props: CanvasProps) {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw(props);
    this.checkToRemove(props.ctx.canvas.width, props.ctx.canvas.height);
  }
}

export default Projectile;
