import { useEffect, useRef } from 'react';
import GameController from '../game/GameController';

const useCanvas = (controller?: GameController) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas: any = ref?.current;
    const context = canvas?.getContext('2d');

    const resize = () => {
      if (canvas) {
        controller?.offset(
          (window.innerWidth - canvas.width) / 2,
          (window.innerHeight - canvas.height) / 2
        );
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    const render = () => {
      frameCount = frameCount >= 60 ? 0 : frameCount + 1;
      controller?.update({ ctx: context, frameCount });
      animationFrameId = window.requestAnimationFrame(render);
    };

    let frameCount: number = 0;
    let animationFrameId: number = -1;

    window.addEventListener('resize', resize);
    resize();
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [controller]);

  return ref;
};

export default useCanvas;
