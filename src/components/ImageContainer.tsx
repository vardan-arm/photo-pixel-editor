import {useEffect, useRef} from "react";

const CANVAS_WIDTH = 400;

const ImageContainer = () => {
  const imageName = 'flower-pic.jpg';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const editedCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasContext = (canvasRef.current as HTMLCanvasElement).getContext('2d');
    if (!canvasContext) {
      console.log('canvas not set');
      return;
    }

    const image = new Image();
    image.src = `${process.env.PUBLIC_URL}/images/${imageName}`;
    image.onload = () => {
      const scale = CANVAS_WIDTH / image.width;
      const canvasHeight = image.height * scale;
      canvasContext.canvas.width = CANVAS_WIDTH;
      canvasContext.canvas.height = canvasHeight;
      canvasContext.scale(scale, scale);

      canvasContext.drawImage(image, 0, 0);
    };
    image.onerror = err => {
      console.error('an error occurred: ', err);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} />
      <canvas ref={editedCanvasRef} />
    </div>
  );
};

export default ImageContainer;
