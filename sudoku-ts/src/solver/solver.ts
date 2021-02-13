import IMatrix from '../interfaces/IMatrix';
import logger from '../logger';
import Cell from './cell';
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

  constructor(private readonly matrix: IMatrix) {
    this.dimension = matrix.rows.length;
    // should be owned by matrix ?
    this.values = [...Array(this.dimension + 1).keys()].slice(1);
  }

  public static create(loadedPuzzle: number[][]): Solver {
    const matrix = toMatrix(loadedPuzzle);
    logger.info('Starting matrix');
    console.log(matrix.toString());
    return new Solver(matrix);
  }

  public solve(recurseMatrix: IMatrix = this.matrix): IMatrix {
    console.log('Solving matrix');
    console.log(recurseMatrix.toString());

    const maxIndex = this.dimension - 1;

    for (const row of recurseMatrix.rows) {
      for (const cell of row.cells) {
        logger.info(`inspecting cell [${cell.column}, ${cell.row}]`);
        if (cell.value === 0) {
          console.log(this.values);
          cell.value = this.pickValidValue(cell, recurseMatrix);
          this.solve(recurseMatrix);
        }
        if (cell.column === maxIndex && cell.row === maxIndex && cell.value !== 0) {
          // we're at the end
          logger.info('Checking final matrix for validity');
          console.log(recurseMatrix.toString());
        }
      }
    }

    return this.matrix;
  }

  /**
   * Given a matrix and a cell, pick a valid value for that cell
   * @param cell
   * @param matrix
   */
  private pickValidValue(cell: Cell, matrix: IMatrix): number {
    let possibleValues: number[] = [];

    const rowValues = matrix.getRowValues(cell.row);
    const columnValues = matrix.getColumnValues(cell.column);
    const quadrantValues = matrix.getQuadrantValues(cell.quadrant);

    this.values.forEach((value: number) => {
      if (rowValues.indexOf(value) < 0
        && columnValues.indexOf(value) < 0
        && quadrantValues.indexOf(value) < 0) {
        possibleValues = possibleValues.concat(value);
      }
    });
    logger.info(`Possible values for [${cell.column}, ${cell.row}]: ${possibleValues.toString()}`);
    return possibleValues[0];
  }
}
