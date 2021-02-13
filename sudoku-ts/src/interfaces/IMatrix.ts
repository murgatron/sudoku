/* eslint-disable no-unused-vars */
import ICell from './ICell';
import IRow from './IRow';

export default interface IMatrix {
  rows: IRow[];

  addRow(row: IRow): void;

  getRowValues(row: number): number[];

  getColumnValues(column: number): number[];

  getQuadrantValues(quad: number): number[];

  resetLastIndicesBetween(startPair: number[], endPair: number[]): void;

  determineLastSolvedCell(currentCell: ICell): ICell;

  // eslint-disable-next-line semi
}
