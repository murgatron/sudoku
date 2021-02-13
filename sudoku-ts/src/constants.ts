import path from 'path';
import { IDivisor } from './interfaces/IDivisor';

export const FOUR_PATH = path.resolve(__dirname, '../../data/four.json');
export const NINE_PATH = path.resolve(__dirname, '../../data/nine.json');
export const TWELVE_PATH = path.resolve(__dirname, '../../data/twelve.json');
export const SIXTEEN_PATH = path.resolve(__dirname, '../../data/sixteen.json');

/**
 * determining these dynamically is rough (thanks 12) so we take the lazy way for now
 */
export const QUAD_DIVISORS = new Map<number, IDivisor>([
    [4, { height: 2, width: 2 }],
    [9, { height: 3, width: 3 }],
    [12, { height: 3, width: 4 }],
    [16, { height: 4, width: 4 }]
]);
