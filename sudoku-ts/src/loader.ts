import fs from 'fs';
import path from 'path';
import {
  FOUR_PATH, NINE_PATH, SIXTEEN_PATH, TWELVE_PATH,
} from './constants';
import ISolverArgs from './interfaces/ISolverArgs';
import logger from './logger';

// eslint-disable-next-line consistent-return
export default function loadPuzzle(args: ISolverArgs): string {
  logger.info(args);
  const {
    four, nine, twelve, sixteen, puzzle, random,
  } = args;

  if (four) {
    return fs.readFileSync(FOUR_PATH).toString();
  }
  if (nine) {
    return NINE_PATH;
  }
  if (twelve) {
    return TWELVE_PATH;
  }
  if (sixteen) {
    return SIXTEEN_PATH;
  }
  if (puzzle) {
    const filepath = path.resolve(__dirname, puzzle);
    logger.info(`Loading puzzle from ${filepath}`);
    throw new Error('Not implemented: puzzle path resolution');
  }
  if (random) {
    throw new Error('Not implemented: random matrix generation');
  }
  return 'Null';
}
