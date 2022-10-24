import {useEffect, useRef} from "react";
import {editImageData, setCanvasSizes} from "../utils/canvasUtils";

const CANVAS_WIDTH = 400;

const ImageContainer = () => {
  const imageName = 'flower-pic.jpg';
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const editedCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasContext = (canvasRef.current as HTMLCanvasElement).getContext('2d', {willReadFrequently: true});
    const editedCanvasContext = (editedCanvasRef.current as HTMLCanvasElement).getContext('2d');

    if (!canvasContext || !editedCanvasContext) {
      console.error('Canvas context is not set');
      return;
    }

    const image = new Image();
    image.src = `${process.env.PUBLIC_URL}/images/${imageName}`;

    image.onload = () => {
      const scale = CANVAS_WIDTH / image.width;
      const canvasHeight = image.height * scale;
      setCanvasSizes(canvasContext, CANVAS_WIDTH, canvasHeight, scale);
      canvasContext.drawImage(image, 0, 0);

      const imageData = canvasContext.getImageData(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
      editImageData(imageData);

      setCanvasSizes(editedCanvasContext, CANVAS_WIDTH, canvasHeight, scale);

      editedCanvasContext.putImageData(imageData, 0, 0);
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
