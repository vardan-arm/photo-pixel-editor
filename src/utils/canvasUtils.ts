export const setCanvasSizes = (canvasContext: CanvasRenderingContext2D, width: number, height: number, scale: number) => {
  canvasContext.canvas.width = width;
  canvasContext.canvas.height = height;
  canvasContext.scale(scale, scale);
};

export const editImageData = (imageData: ImageData) => {
  for (let i = 0; i < imageData.data.length; i++) {
    imageData.data[i] = imageData.data[i] + 15;
    imageData.data[i + 1] = imageData.data[i + 1] + 15;
    imageData.data[i + 2] = imageData.data[i + 2] + 15;
  }
};
