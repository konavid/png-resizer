import React from 'react';
import { Download, Loader2, Play } from 'lucide-react';

interface GenerateSectionProps {
  isReady: boolean;
  isProcessing: boolean;
  progress: { current: number; total: number; message: string } | null;
  zipBlob: Blob | null;
  error: string | null;
  onGenerate: () => void;
  zipFileName: string;
}

export default function GenerateSection({
  isReady,
  isProcessing,
  progress,
  zipBlob,
  error,
  onGenerate,
  zipFileName,
}: GenerateSectionProps) {
  
  const handleDownload = () => {
    if (!zipBlob) return;
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = zipFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Generate Button */}
      {!zipBlob && !isProcessing && (
        <button
          onClick={onGenerate}
          disabled={!isReady}
          className={`
            w-full flex items-center justify-center py-3 px-4 rounded-lg text-sm font-medium transition-colors
            ${isReady
              ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
            }
          `}
        >
          <Play className="w-4 h-4 mr-2" />
          Generate PNG Pack
        </button>
      )}

      {/* Progress state */}
      {isProcessing && progress && (
        <div className="w-full bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4">
          <div className="flex justify-between text-sm mb-2 text-zinc-700 dark:text-zinc-300">
            <span className="truncate max-w-[70%] text-xs font-mono">{progress.message}</span>
            <span>{progress.current} / {progress.total}</span>
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${Math.max(5, (progress.current / progress.total) * 100)}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Success Download */}
      {zipBlob && !isProcessing && (
        <div className="w-full flex flex-col space-y-3">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/30 text-green-800 dark:text-green-300 p-4 rounded-lg text-sm flex items-center">
            <span className="flex-1">생성이 완료되었습니다.</span>
          </div>
          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center py-3 px-4 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            ZIP 파일 다운로드
          </button>
          
          <button
            onClick={onGenerate}
            className="w-full flex items-center justify-center py-2 px-4 rounded-lg text-sm font-medium bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
          >
            다시 생성하기
          </button>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 text-red-600 dark:text-red-400 p-4 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
