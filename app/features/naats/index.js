// Screens only import from here. When your backend is ready, change the
// bodies of these functions (or turn them into hooks) – screens stay the same.
import { NAATS } from './sampleData';

export const newNaats = () => NAATS;
export const popularNaats = () => [...NAATS].sort((a, b) => b.likes - a.likes);
export const favoriteNaats = () => NAATS.filter((n) => Number(n.id) % 5 === 0);
export const naatsByCategory = (id) => NAATS.filter((n) => n.category === id);
export const searchNaats = (q, field) => NAATS.filter((n) => n[field].includes(q));
export const findNaat = (id) => NAATS.find((n) => n.id === id);
export const allNaats = () => NAATS;
