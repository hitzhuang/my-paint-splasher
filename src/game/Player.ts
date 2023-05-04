import GameObject, { CanvasProps } from './GameObject';

class Player extends GameObject {
  radius!: number;

  constructor(
    radius: number = 0,
    color: string = '#ffffff',
    x: number = 0,
    y: number = 0
  ) {
    super(x, y, color);
    this.radius = radius;
  }

  draw(props: CanvasProps) {
    let { ctx, frameCount } = props;
    if (ctx) {
      let delta = Math.sin(frameCount * 0.05) ** 2 * 3;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius - delta, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  update(props: CanvasProps) {
    let { ctx } = props;
    this.x = ctx.canvas.width / 2;
    this.y = ctx.canvas.height / 2;
    this.draw(props);
  }
}

export default Player;
