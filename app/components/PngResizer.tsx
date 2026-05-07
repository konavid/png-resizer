'use client';

import React, { useState, useEffect } from 'react';
import UploadZone from './UploadZone';
import PackSelector from './PackSelector';
import GenerateSection from './GenerateSection';
import { PRINT_PACKS } from '../lib/packs';
import { generateZip } from '../lib/zip';

export default function PngResizer() {
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  
  const [prefix, setPrefix] = useState<string>('');
  const [selectedPacks, setSelectedPacks] = useState<string[]>(['2x3', '4x5', '3x4', 'iso', '11x14']); // Default selection
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState<{current: number, total: number, message: string} | null>(null);
  const [zipBlob, setZipBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Auto-set prefix from filename when uploaded
  useEffect(() => {
    if (currentFile && !prefix) {
      const nameWithoutExt = currentFile.name.replace(/\.[^/.]+$/, "");
      // sanitize slightly
      const cleanName = nameWithoutExt.replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
      setPrefix(cleanName || 'myart');
    }
  }, [currentFile, prefix]);

  const handleFileSelect = (file: File, img: HTMLImageElement) => {
    setCurrentFile(file);
    setImageElement(img);
    setZipBlob(null); // Reset generated zip when new file is uploaded
    setError(null);
  };

  const handleClear = () => {
    setCurrentFile(null);
    setImageElement(null);
    setZipBlob(null);
    setProgress(null);
    setError(null);
  };

  const handlePackToggle = (packId: string) => {
    setSelectedPacks(prev => 
      prev.includes(packId)
        ? prev.filter(id => id !== packId)
        : [...prev, packId]
    );
    setZipBlob(null); // Reset on config change
  };

  const handleGenerate = async () => {
    if (!imageElement || selectedPacks.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setZipBlob(null);

    const packsToGenerate = PRINT_PACKS.filter(p => selectedPacks.includes(p.id));
    const safePrefix = prefix || 'myart';

    try {
      const blob = await generateZip({
        sourceImage: imageElement,
        selectedPacks: packsToGenerate,
        prefix: safePrefix,
        onProgress: (current, total, message) => {
          setProgress({ current, total, message });
        }
      });
      
      setZipBlob(blob);
    } catch (err) {
      console.error(err);
      setError('이미지 처리 중 오류가 발생했습니다. 브라우저 메모리가 부족할 수 있습니다.');
    } finally {
      setIsProcessing(false);
      setProgress(null);
    }
  };

  const isReady = !!imageElement && selectedPacks.length > 0;
  const zipFileName = `${prefix || 'myart'}_print_pack.zip`;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          PNG Print Pack Resizer
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          PNG 원본을 업로드하고 클릭 한 번으로 모든 비율의 인쇄용 파일을 생성하세요.
        </p>
      </div>

      <div className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Step 1: Upload */}
        <div className="p-6 sm:p-8 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm mr-2 text-zinc-600 dark:text-zinc-300">1</span>
            원본 이미지 업로드
          </h2>
          <UploadZone
            currentFile={currentFile}
            imageElement={imageElement}
            onFileSelect={handleFileSelect}
            onClear={handleClear}
          />
        </div>

        {/* Step 2: Settings */}
        <div className={`p-6 sm:p-8 border-b border-zinc-200 dark:border-zinc-800 transition-opacity ${!imageElement ? 'opacity-50 pointer-events-none' : ''}`}>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4 flex items-center">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800 text-sm mr-2 text-zinc-600 dark:text-zinc-300">2</span>
            출력 설정
          </h2>
          <PackSelector
            prefix={prefix}
            onPrefixChange={setPrefix}
            selectedPacks={selectedPacks}
            onPackToggle={handlePackToggle}
          />
        </div>

        {/* Step 3: Generate */}
        <div className={`p-6 sm:p-8 bg-zinc-50/50 dark:bg-zinc-900/20 transition-opacity ${!isReady ? 'opacity-50 pointer-events-none' : ''}`}>
          <GenerateSection
            isReady={isReady}
            isProcessing={isProcessing}
            progress={progress}
            zipBlob={zipBlob}
            error={error}
            onGenerate={handleGenerate}
            zipFileName={zipFileName}
          />
        </div>

      </div>
      
      <div className="text-center text-xs text-zinc-400 dark:text-zinc-600">
        모든 처리는 브라우저 내부에서만 안전하게 이루어집니다.
      </div>
    </div>
  );
}
