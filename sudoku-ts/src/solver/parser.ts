/* eslint-disable no-restricted-syntax */
import IMatrix from '../interfaces/IMatrix';
import Cell from './cell';
import Matrix from './matrix';
import Row from './row';

export default function toMatrix(json: number[][]): IMatrix {
  const matrix = new Matrix();

  for (const row of json) {
    const realRow = new Row();
    for (const [cellIndex, cell] of row.entries()) {
      const realCell = new Cell(json.indexOf(row), cellIndex, 0, cell);
      realRow.addCell(realCell);
    }
    matrix.addRow(realRow);
  }

  return matrix;
}
