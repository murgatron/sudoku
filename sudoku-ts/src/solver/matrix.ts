import IMatrix from '../interfaces/IMatrix';
import Cell from './cell';
import Row from './row';

export default class Matrix implements IMatrix {
  // eslint-disable-next-line no-empty-function
  constructor(public rows: Row[] = []) { }

  /**
     * Add a row to the matrix.
     * @param {*} newRow
     */
  addRow(newRow: Row): void {
    this.rows = this.rows.concat(newRow);
  }

  getRowValues(row: number): number[] {
    return this.rows[row].cells.map((cell) => cell.value);
  }

  getColumnValues(column: number): number[] {
    return this.rows.map((row) => row.cells[column].value);
  }

  getQuadrantValues(quad: number): number[] {
    const quadValues: number[] = [];
    this.rows.forEach((row) => {
      const cellsInQuad: Cell[] = row.cells.filter((cell) => cell.quadrant === quad);
      cellsInQuad.forEach((cell) => quadValues.push(cell.value));
    });
    return quadValues;
  }

  toString(): string {
    return this.rows.map((row) => row.toString()).join('\n');
  }
}
