import type { PricePoint } from '@/types';

export const generatePriceTrend = (baseBuy: number, baseSell: number): PricePoint[] => {
  const points: PricePoint[] = [];
  const dates = ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'];

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
