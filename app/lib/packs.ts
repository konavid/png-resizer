export interface PrintSize {
  label: string;
  widthInch: number;
  heightInch: number;
  widthPx: number; // 300 DPI
  heightPx: number; // 300 DPI
}

export interface PrintPack {
  id: string;
  name: string;
  ratio: string;
  sizes: PrintSize[];
}

export const PRINT_PACKS: PrintPack[] = [
  {
    id: '2x3',
    name: '2:3 Ratio Pack',
    ratio: '2x3',
    sizes: [
      { label: '20x30', widthInch: 20, heightInch: 30, widthPx: 6000, heightPx: 9000 },
    ],
  },
  {
    id: '4x5',
    name: '4:5 Ratio Pack',
    ratio: '4x5',
    sizes: [
      { label: '16x20', widthInch: 16, heightInch: 20, widthPx: 4800, heightPx: 6000 },
    ],
  },
  {
    id: '3x4',
    name: '3:4 Ratio Pack',
    ratio: '3x4',
    sizes: [
      { label: '18x24', widthInch: 18, heightInch: 24, widthPx: 5400, heightPx: 7200 },
    ],
  },
  {
    id: 'iso',
    name: 'ISO Ratio Pack',
    ratio: 'ISO',
    sizes: [
      { label: 'A2', widthInch: 16.5, heightInch: 23.4, widthPx: 4961, heightPx: 7016 },
    ],
  },
  {
    id: '11x14',
    name: '11:14 Ratio Pack',
    ratio: '11x14',
    sizes: [
      { label: '11x14', widthInch: 11, heightInch: 14, widthPx: 3300, heightPx: 4200 },
    ],
  },
];
