/* eslint-disable no-empty-function */
import Cell from './cell';
import IRow from '../interfaces/IRow';

export default class Row implements IRow {
  constructor(public cells: Cell[] = []) { }

  /**
   * Add cell to the row.
   * @param {*} _newCell
   */
  addCell(newCell: Cell): void {
    this.cells = this.cells.concat(newCell);
  }

/**
 * an asterisk (*) denotes a preset puzzle value.
 * numbers in parens represent the quadrant value.
 */
  toString(): string {
    return `[ ${this.cells.map((cell) => (` ${cell.value}${cell.isPuzzleValue ? '*' : ' '} (${cell.quadrant})`)).join(',')} ]`;
  }
}
