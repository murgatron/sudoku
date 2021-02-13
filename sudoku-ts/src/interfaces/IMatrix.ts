/* eslint-disable no-unused-vars */
import IRow from './IRow';

export default interface IMatrix {
  rows: IRow[];

  addRow(row: IRow): void;

  getRowValues(row: number): number[];

  getColumnValues(column: number): number[];

  getQuadrantValues(quad: number): number[];

  // eslint-disable-next-line semi
}
