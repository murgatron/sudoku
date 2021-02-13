/* eslint-disable no-underscore-dangle */
import Cell from './cell';
import { DIMENSION } from './constants';

/**
 * Build the column string based on dimension.
 */
function buildColumnString(): string {
  // start with 5 spaces
  let _colString = '     ';
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < DIMENSION; i++) {
    _colString = _colString.concat(`${i} `);
    if (i === (DIMENSION / 2 - 1)) {
      // 2 spaces to account for delim
      _colString = _colString.concat('  ');
    }
  }
  return _colString;
}

/**
 * Print nulls in a nice way
 * @param {*} value
 */
function printNull(value: number) {
  return (value == null) ? '-' : value;
}

/**
 * Print the matrix nicely. Dynamic based on dimension.
 */
export default function printNice(matrix: Cell[][]) {
  // for columns
  const _colString = buildColumnString();
  console.log(_colString);

  // now rows
  // eslint-disable-next-line no-shadow
  matrix.forEach((row, rowIndex, matrix) => {
    let _rowString = `${rowIndex}: [ `;
    row.forEach((cell, cellIndex, rows) => {
      _rowString = _rowString.concat(`${printNull(cell.value)} `);
      if (cellIndex === (rows.length / 2 - 1)) {
        _rowString = _rowString.concat('| ');
      }
    });
    console.log(`${_rowString}] `);

    // account for vertical delim
    if (rowIndex === (matrix.length / 2 - 1)) {
      console.log('   -------------');
    }
  });
}
