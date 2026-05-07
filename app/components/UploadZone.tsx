import React, { useCallback, useState } from 'react';
import { UploadCloud, FileImage, X } from 'lucide-react';

interface UploadZoneProps {
  onFileSelect: (file: File, img: HTMLImageElement) => void;
  onClear: () => void;
  currentFile: File | null;
  imageElement: HTMLImageElement | null;
}

export default function UploadZone({
  onFileSelect,
  onClear,
  currentFile,
  imageElement,
}: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback((file: File) => {
    setError(null);

    if (file.type !== 'image/png') {
      setError('PNG 파일만 업로드 가능합니다.');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError('파일 크기는 50MB 이하여야 합니다.');
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      // 2:3 비율 및 최소 해상도 체크 (6000x9000)
      const ratio = img.width / img.height;
      const targetRatio = 2 / 3;
      const isCorrectRatio = Math.abs(ratio - targetRatio) < 0.01;
      const isCorrectSize = img.width >= 6000 && img.height >= 9000;

      if (!isCorrectRatio || !isCorrectSize) {
        setError('권장 사양(6000x9000 px 이상, 2:3 비율)에 맞는 이미지를 권장합니다.');
        // 차단하지는 않고 에러 메시지만 표시하거나, 엄격하게 하려면 여기서 return 가능
        // 유저가 '안내 문구'만 요청했으므로 경고 메시지만 띄우고 진행하도록 함
      }
      
      onFileSelect(file, img);
    };
    img.onerror = () => {
      setError('이미지를 읽을 수 없습니다.');
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, [onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  }, [processFile]);

  if (currentFile && imageElement) {
    return (
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-16 h-16 rounded overflow-hidden bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
              <img 
                src={imageElement.src} 
                alt="Preview" 
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div>
              <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100 truncate max-w-[200px] sm:max-w-xs">
                {currentFile.name}
              </p>
              <div className="flex items-center space-x-2 mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center">
                  <FileImage className="w-3 h-3 mr-1" />
                  {(currentFile.size / (1024 * 1024)).toFixed(2)} MB
                </span>
                <span>•</span>
                <span className={imageElement.width < 6000 || imageElement.height < 9000 ? "text-amber-500" : ""}>
                  {imageElement.width} × {imageElement.height} px
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              URL.revokeObjectURL(imageElement.src);
              onClear();
            }}
            className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title="이미지 삭제"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {(imageElement.width < 6000 || imageElement.height < 9000 || Math.abs(imageElement.width/imageElement.height - 2/3) > 0.01) && (
          <p className="mt-2 text-[10px] text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded border border-amber-100 dark:border-amber-900/30">
            ⚠ 6000x9000 px 이상의 2:3 비율 이미지를 권장합니다.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div
        className={`
          relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl transition-colors cursor-pointer
          ${isDragging 
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
            : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 bg-zinc-50 dark:bg-zinc-900/50'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <input
          id="file-upload"
          type="file"
          accept="image/png"
          className="hidden"
          onChange={handleFileInput}
        />
        <UploadCloud className={`w-10 h-10 mb-3 ${isDragging ? 'text-blue-500' : 'text-zinc-400 dark:text-zinc-500'}`} />
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-1">
          클릭하거나 이미지를 드래그 앤 드롭하세요
        </p>
        <div className="text-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            PNG 파일만 지원 (최대 50MB)
          </p>
          <p className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 mt-1">
            권장: 6000 × 9000 px 이상의 2:3 비율
          </p>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-500 font-medium px-1">{error}</p>
      )}
    </div>
  );
}
