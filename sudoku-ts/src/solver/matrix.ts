/* eslint-disable no-unused-vars */
import IMatrix from '../interfaces/IMatrix';
import Row from './row';

export default class Matrix implements IMatrix {
  // eslint-disable-next-line no-empty-function
  constructor(public rows: Row[] = []) { }

  /**
     * Add a row to the matrix.
     * @param {*} newRow
     */
  addRow(newRow: Row) {
    this.rows = this.rows.concat(newRow);
  }

  toString(): string {
    return this.rows.map((row) => row.toString()).join('\n');
  }
}
