import JSZip from 'jszip';
import { PrintPack } from './packs';
import { resizeImage } from './resizer';

export interface GenerateOptions {
  sourceImage: HTMLImageElement;
  selectedPacks: PrintPack[];
  prefix: string;
  onProgress?: (current: number, total: number, currentFileName: string) => void;
}

export async function generateZip({
  sourceImage,
  selectedPacks,
  prefix,
  onProgress,
}: GenerateOptions): Promise<Blob> {
  const zip = new JSZip();
  
  // Calculate total sizes to generate
  let totalFiles = 0;
  for (const pack of selectedPacks) {
    totalFiles += pack.sizes.length;
  }

  let generatedCount = 0;

  for (const pack of selectedPacks) {
    for (const size of pack.sizes) {
      const fileName = `${prefix}_${pack.ratio}_${size.label}_${size.widthPx}x${size.heightPx}.png`;
      
      if (onProgress) {
        onProgress(generatedCount, totalFiles, fileName);
      }

      const blob = await resizeImage(sourceImage, size.widthPx, size.heightPx);
      zip.file(fileName, blob);
      
      generatedCount++;
    }
  }

  if (onProgress) {
    onProgress(totalFiles, totalFiles, 'Zipping files...');
  }

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  return zipBlob;
}
