export async function resizeImage(
  sourceImage: HTMLImageElement,
  targetWidth: number,
  targetHeight: number
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('Canvas 2D context is not supported');
      }

      // Calculate source crop area
      const sourceAspect = sourceImage.width / sourceImage.height;
      const targetAspect = targetWidth / targetHeight;

      let sWidth = sourceImage.width;
      let sHeight = sourceImage.height;
      let sx = 0;
      let sy = 0;

      if (sourceAspect > targetAspect) {
        // Source is wider than target
        sWidth = sourceImage.height * targetAspect;
        sx = (sourceImage.width - sWidth) / 2;
      } else if (sourceAspect < targetAspect) {
        // Source is taller than target
        sHeight = sourceImage.width / targetAspect;
        sy = (sourceImage.height - sHeight) / 2;
      }

      // Disable image smoothing for high quality (optional, depends on browser)
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw image
      ctx.drawImage(
        sourceImage,
        sx, sy, sWidth, sHeight,
        0, 0, targetWidth, targetHeight
      );

      // Export to Blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create Blob from canvas'));
          }
        },
        'image/png'
      );
    } catch (error) {
      reject(error);
    }
  });
}
