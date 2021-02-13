import ICell from '../interfaces/ICell';
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

  resetLastIndicesBetween(startPair: number[], endPair: number[]): void {
    const [startRow, startCol] = startPair;
    const [endRow, endCol] = endPair;
    if (startRow === endRow && startCol === endCol) {
      return;
    }
    console.log(`Resetting lastIndex of [${startRow}, ${startCol}], until [${endRow}, ${endCol}]`);
    this.rows[startRow].cells[startCol].lastIndex = 0;

    if (startCol === 0) {
      return this.resetLastIndicesBetween([startRow - 1, this.rows.length - 1], endPair);
    } else {
      return this.resetLastIndicesBetween([startRow, startCol - 1], endPair);
    }
  }

  /**
   * In a backtracking case, scroll backwards through the matrix until
   * a non-puzzle cell can be unset. 
   * @param currentCell
   * @param matrix 
   */
  determineLastSolvedCell(currentCell: ICell): ICell {
    let rowOfLastCell: number;
    let columnOfLastCell: number;

    if (currentCell.column === 0) {
      rowOfLastCell = currentCell.row - 1;
      columnOfLastCell = this.rows.length - 1;
    } else {
      rowOfLastCell = currentCell.row;
      columnOfLastCell = currentCell.column - 1;
    }
    const previousCell = this.rows[rowOfLastCell].cells[columnOfLastCell];
    console.log(`Determined a previous cell of [${previousCell.row}, ${previousCell.column}]`);

    // don't unset a puzzle value if this is one 
    if (previousCell.isPuzzleValue) {
      console.log(`[${previousCell.row}, ${previousCell.column}] is a puzzle value. Moving back one more.`)
      return this.determineLastSolvedCell(previousCell);
    }
    // otherwise this is where we want to backtrack
    return previousCell;
  }

  toString(): string {
    return this.rows.map((row) => row.toString()).join('\n');
  }
}
