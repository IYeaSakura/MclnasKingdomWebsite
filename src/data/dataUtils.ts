import type { PricePoint } from '@/types';

export const generatePriceTrend = (baseBuy: number, baseSell: number): PricePoint[] => {
  const points: PricePoint[] = [];
  const dates = ['2026-01', '2026-02', '2026-03', '2026-04', '2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10', '2026-11', '2026-12'];

  dates.forEach((date, index) => {
    const variance = Math.sin(index * 0.5) * 0.2 + Math.random() * 0.1 - 0.05;
    points.push({
      date,
      buyPrice: Math.round(baseBuy * (1 + variance)),
      sellPrice: Math.round(baseSell * (1 + variance * 0.8))
    });
  });

  return points;
};

export const generateId = (prefix: string, index: number): string => {
  return `${prefix}-${String(index).padStart(3, '0')}`;
};
