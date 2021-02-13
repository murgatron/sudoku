import { exitOnError } from 'winston';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';
import ICell from '../interfaces/ICell';
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

  public solve(recurseMatrix: IMatrix = this.matrix, backtracking?: number): IMatrix {
    console.log('Solving matrix');
    console.log(recurseMatrix.toString());

    const maxIndex = this.dimension - 1;

    for (const row of recurseMatrix.rows) {
      for (const cell of row.cells) {
        if (cell.value === undefined) {
          // This matrix is bad, let's move on.
          throw new Error("Something's gone terribly wrong");
        }
        if (cell.value === 0) {
          logger.info(`inspecting cell [${cell.row}, ${cell.column}]`);
          const validValue = this.pickValidValue(cell, recurseMatrix, backtracking);
          if (validValue === undefined) {
            console.log(`Valid value ${validValue}!`);
            const { row, column } = this.determineLastSolvedCell(cell, recurseMatrix);
            console.log(`Need to backtrack to [${row}, ${column}]`);
            recurseMatrix.rows[row].cells[column].value = 0;
            const tracking = backtracking ? backtracking + 1 : 1;
            this.solve(recurseMatrix, tracking);
          } else {
            cell.value = validValue;
            this.solve(recurseMatrix);
          }
        }
        if (cell.column === maxIndex && cell.row === maxIndex && cell.value !== 0) {
          // we're at the end
          logger.info('Checking final matrix for validity');
          console.log(recurseMatrix.toString());
          return recurseMatrix;
        }
      }
    }

    return this.matrix;
  }

  /**
   * In a backtracking case, scroll backwards through the matrix until
   * a non-puzzle cell can be unset. 
   * @param cell 
   * @param matrix 
   */
  private determineLastSolvedCell(cell: ICell, matrix: IMatrix): ICell {
    let rowOfLastCell: number;
    let columnOfLastCell: number;

    if (cell.column === 0) {
      rowOfLastCell = cell.row - 1;
      columnOfLastCell = matrix.rows.length - 1;
    } else {
      rowOfLastCell = cell.row;
      columnOfLastCell = cell.column - 1;
    }
    const previousCell = matrix.rows[rowOfLastCell].cells[columnOfLastCell];
    console.log(`Determined a previous cell of [${previousCell.row}, ${previousCell.column}]`);

    // don't unset a puzzle value if this is one 
    if (previousCell.isPuzzleValue) {
      console.log(`[${previousCell.row}, ${previousCell.column}] is a puzzle value. Moving back one more.`)
      return this.determineLastSolvedCell(previousCell, matrix);
    }
    // otherwise this is where we want to backtrack
    return previousCell;
  }

  /**
   * Given a matrix and a cell, pick a valid value for that cell
   * @param cell
   * @param matrix
   */
  private pickValidValue(cell: ICell, matrix: IMatrix, index = 0): number {
    console.log(`picking values. are we backtracking? ${index}`);
    const possibleValues: number[] = [];

    const rowValues = matrix.getRowValues(cell.row);
    const columnValues = matrix.getColumnValues(cell.column);
    const quadrantValues = matrix.getQuadrantValues(cell.quadrant);

    this.values.forEach((value: number) => {
      console.log(`Index for value ${value}: [${rowValues.indexOf(value)}, ${columnValues.indexOf(value)}, ${quadrantValues.indexOf(value)}]`);
      if (rowValues.indexOf(value) < 0
        && columnValues.indexOf(value) < 0
        && quadrantValues.indexOf(value) < 0) {
        console.log(`Adding value ${value} to possible values`);
        possibleValues.push(value);
      }
    });
    logger.info(`Possible values for [${cell.row}, ${cell.column}]: ${possibleValues.toString()}. Picking index ${index}`);
    return possibleValues[index];
  }
}
