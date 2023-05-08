import useCanvas from '../hooks/useCanvas';

interface CanvasProps {
  game: any;
}

const Canvas = ({ game }: CanvasProps) => {
  const ref = useCanvas(game);
  return (
    <canvas
      id="canvas"
      className="absolute left-0 right-0 top-0 bottom-0"
      ref={ref}
    />
  );
};

export default Canvas;
