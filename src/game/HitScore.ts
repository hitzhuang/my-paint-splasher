import GameObject, { CanvasProps } from './GameObject';

class HitScore extends GameObject {
  score: number;
  toRemove: boolean;
  alpha: number;

  constructor(x: number, y: number, color: string, score: number) {
    super(x, y);
    this.color = color;
    this.score = score;
    this.toRemove = false;
    this.alpha = 1;
  }

  draw(props: CanvasProps): void {
    let { ctx } = props;
    if (ctx) {
      ctx.save();
      ctx.fillStyle = this.color;
      ctx.font = 'bold 24px sans-serif';
      ctx.globalAlpha = this.alpha;
      ctx.fillText(this.score.toString(), this.x, this.y);
      ctx.restore();
    }
  }

  update(props: CanvasProps): void {
    this.y -= 1;
    this.alpha -= 0.02;
    if (this.alpha < 0) this.alpha = 0;
    this.draw(props);
  }

  checkToRemove() {
    if (this.alpha <= 0) this.toRemove = true;
  }
}

export default HitScore;
