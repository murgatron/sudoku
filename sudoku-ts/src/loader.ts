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
    return fs.readFileSync(NINE_PATH).toString();
  }
  if (twelve) {
    return fs.readFileSync(TWELVE_PATH).toString();
  }
  if (sixteen) {
    return fs.readFileSync(SIXTEEN_PATH).toString();
  }
  if (puzzle) {
    const filepath = path.resolve(__dirname, puzzle);
    logger.info(`Loading puzzle from ${filepath}`);
    return fs.readFileSync(filepath).toString();
  }
  if (random) {
    throw new Error('Not implemented: random matrix generation');
  }

  // TODO: could probably do something better here
  throw new Error('No argument provided');
}
