export interface CanvasProps {
  ctx: any;
  frameCount: number;
  data?: any;
}

class GameObject {
  x: number;
  y: number;
  color?: string;

  constructor(x: number = 0, y: number = 0, color: string = '#ffffff') {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  offset(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  update(props: CanvasProps) {
    let { data } = props;
    this.x = data?.x ?? this.x;
    this.y = data?.y ?? this.y;
    this.color = data?.color ?? this.color;
  }
}

export default GameObject;
