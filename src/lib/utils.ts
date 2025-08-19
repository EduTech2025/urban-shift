import { clsx, type ClassValue } from "clsx"

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price)
}

export function createCityScape(id: string, colors: { start: string; end: string }) {
  const buildings = {
    city1: [
      { x: 50, y: 150, w: 30, h: 100 },
      { x: 90, y: 120, w: 25, h: 130 },
      { x: 125, y: 140, w: 35, h: 110 },
      { x: 170, y: 100, w: 40, h: 150 },
      { x: 220, y: 130, w: 30, h: 120 },
      { x: 260, y: 110, w: 35, h: 140 },
      { x: 305, y: 160, w: 25, h: 90 }
    ],
    residential: [
      { x: 80, y: 120, w: 60, h: 120 },
      { x: 150, y: 100, w: 70, h: 140 },
      { x: 230, y: 110, w: 65, h: 130 }
    ],
    skyline: [
      { x: 30, y: 180, w: 25, h: 80 },
      { x: 65, y: 160, w: 30, h: 100 },
      { x: 105, y: 140, w: 35, h: 120 },
      { x: 150, y: 120, w: 40, h: 140 },
      { x: 200, y: 100, w: 45, h: 160 },
      { x: 255, y: 130, w: 35, h: 130 },
      { x: 300, y: 150, w: 30, h: 110 },
      { x: 340, y: 170, w: 25, h: 90 }
    ],
    luxury: [
      { x: 60, y: 140, w: 50, h: 100 },
      { x: 120, y: 120, w: 55, h: 120 },
      { x: 185, y: 100, w: 60, h: 140 },
      { x: 255, y: 130, w: 50, h: 110 },
      { x: 315, y: 150, w: 45, h: 90 }
    ]
  };

  const buildingData = buildings[id as keyof typeof buildings] || buildings.city1;
  
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${encodeURIComponent(colors.start)};stop-opacity:1" /><stop offset="100%" style="stop-color:${encodeURIComponent(colors.end)};stop-opacity:1" /></linearGradient></defs><rect width="400" height="300" fill="url(%23${id})"/><g fill="%23ffffff" opacity="0.7">${buildingData.map(b => `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}"/>`).join('')}</g></svg>`;
}