/* eslint-disable no-restricted-syntax */
/* eslint-disable no-useless-constructor */
import IMatrix from '../interfaces/IMatrix';
import logger from '../logger';
import toMatrix from './parser';

export default class Solver {
  /**
   * The dimension of the matrix.
   * A 4x4 matrix has a dimension of 4.
   */
  private dimension: number;

  /**
   * The available numbers that can be assigned to a cell value
   * For a 4x4 matrix, this is [1, 2, 3, 4].
   */
  private values: number[];

  // eslint-disable-next-line no-unused-vars
  constructor(private readonly matrix: IMatrix) {
    this.dimension = matrix.rows.length;
    this.values = [...Array(this.dimension).keys()];
  }

  public static create(loadedPuzzle: number[][]): Solver {
    const matrix = toMatrix(loadedPuzzle);
    logger.info('Starting matrix');
    console.log(matrix.toString());
    return new Solver(matrix);
  }

  public solve(recurseMatrix: IMatrix = this.matrix): IMatrix {
    for (const row of recurseMatrix.rows) {
      for (const cell of row.cells) {
        logger.info(`inspecting cell [${cell.column}, ${cell.row}]`);
      }
    }

    return this.matrix;
  }
}
