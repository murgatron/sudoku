/* eslint-disable no-restricted-syntax */
import { QUAD_DIVISORS } from '../constants';
import IMatrix from '../interfaces/IMatrix';
import Cell from './cell';
import Matrix from './matrix';
import Row from './row';

/**
 * derive the quadrant number from dimension, row, and column.
 * @param dimension 
 * @param row 
 * @param col 
 */
const quadrant = (dimension: number, row: number, col: number): number => {
  const divisor = QUAD_DIVISORS.get(dimension);
  if (!divisor) {
    throw new Error(`Puzzle has an unsupported dimension: ${dimension}`);
  }
  const colQuad = col / divisor.width;
  const rowQuad = row / divisor.height;
  return Math.floor(colQuad) + ((divisor.height * Math.floor(rowQuad)));
}

/**
 * Turn a json representation of a matrix into a Matrix class.
 * @param json
 */
export default function toMatrix(json: number[][]): IMatrix {
  const matrix = new Matrix();

  for (const row of json) {
    const realRow = new Row();
    for (const [cellIndex, cell] of row.entries()) {
      const rowIndex = json.indexOf(row);
      const dimension = row.length;
      const realCell = new Cell(
        rowIndex,
        cellIndex,
        quadrant(dimension, rowIndex, cellIndex),
        cell,
        cell > 0,
        0
      );
      realRow.addCell(realCell);
    }
    matrix.addRow(realRow);
  }

  return matrix;
}


