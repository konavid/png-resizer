import React from 'react';
import { PRINT_PACKS } from '../lib/packs';

interface PackSelectorProps {
  prefix: string;
  onPrefixChange: (prefix: string) => void;
  selectedPacks: string[];
  onPackToggle: (packId: string) => void;
}

export default function PackSelector({
  prefix,
  onPrefixChange,
  selectedPacks,
  onPackToggle,
}: PackSelectorProps) {
  // Generate flat list of selected files for preview
  const selectedFilesList = PRINT_PACKS
    .filter(pack => selectedPacks.includes(pack.id))
    .flatMap(pack => pack.sizes.map(size => ({
      pack: pack,
      size: size
    })));

  return (
    <div className="space-y-6">
      {/* Settings Row */}
      <div className="space-y-4">
        <div>
          <label htmlFor="prefix" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            파일명 Prefix
          </label>
          <input
            id="prefix"
            type="text"
            value={prefix}
            onChange={(e) => onPrefixChange(e.target.value)}
            placeholder="myart"
            className="w-full px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-zinc-900 dark:text-zinc-100"
          />
          <p className="mt-1 text-xs text-zinc-500">
            결과 파일: <span className="font-mono">{prefix || 'myart'}_[비율]_[사이즈].png</span>
          </p>
        </div>

        <div>
          <span className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            출력 팩 선택
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PRINT_PACKS.map((pack) => (
              <label
                key={pack.id}
                className={`
                  relative flex cursor-pointer rounded-lg border p-3 focus:outline-none transition-colors
                  ${selectedPacks.includes(pack.id) 
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                    : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500'
                  }
                `}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={selectedPacks.includes(pack.id)}
                  onChange={() => onPackToggle(pack.id)}
                />
                <div className="flex flex-col">
                  <span className={`block text-sm font-medium ${selectedPacks.includes(pack.id) ? 'text-blue-900 dark:text-blue-100' : 'text-zinc-900 dark:text-zinc-100'}`}>
                    {pack.ratio}
                  </span>
                  <span className={`block text-xs mt-1 ${selectedPacks.includes(pack.id) ? 'text-blue-700 dark:text-blue-300' : 'text-zinc-500 dark:text-zinc-400'}`}>
                    {pack.sizes.length} sizes
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Table */}
      {selectedFilesList.length > 0 && (
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">
            생성 예정 파일 ({selectedFilesList.length}개)
          </h3>
          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 max-h-64 overflow-y-auto">
            <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
              <thead className="bg-zinc-50 dark:bg-zinc-800/50 sticky top-0 backdrop-blur-sm">
                <tr>
                  <th scope="col" className="px-4 py-2 text-left font-medium text-zinc-500 dark:text-zinc-400">비율</th>
                  <th scope="col" className="px-4 py-2 text-left font-medium text-zinc-500 dark:text-zinc-400">사이즈</th>
                  <th scope="col" className="px-4 py-2 text-right font-medium text-zinc-500 dark:text-zinc-400">픽셀 크기</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {selectedFilesList.map((item, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                    <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100 whitespace-nowrap">{item.pack.ratio}</td>
                    <td className="px-4 py-2 text-zinc-900 dark:text-zinc-100 whitespace-nowrap">{item.size.label}</td>
                    <td className="px-4 py-2 text-zinc-500 dark:text-zinc-400 text-right whitespace-nowrap font-mono text-xs">
                      {item.size.widthPx} × {item.size.heightPx}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
