/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import Cell from './cell';
import { VALUES, DIMENSION } from './constants';
import Matrix from './matrix';
import printNice from './print';
import Row from './row';

/**
 * Calculate the quadrant for the row and column.
 * @param {*} row
 * @param {*} col
 */
function calculateQuad(row: number, col: number): number | undefined {
  let _quad;
  const _rowLessThanHalf = row <= DIMENSION / 2 - 1;
  const _rowMoreThanHalf = row > DIMENSION / 2;
  const _colLessThanHalf = col <= DIMENSION / 2 - 1;
  const _colMoreThanHalf = col > DIMENSION / 2;

  // 1: lte row/2-1, lte col/2-1
  if (_rowLessThanHalf && _colLessThanHalf) {
    _quad = 0;
  }
  // 2: gt row/2, gt col/2
  if (_rowLessThanHalf && _colMoreThanHalf) {
    _quad = 1;
  }
  // 3: gt row/2, lte col/2-1
  if (_rowMoreThanHalf && _colLessThanHalf) {
    _quad = 2;
  }
  // 4: gt row/2, gt col/2
  if (_rowMoreThanHalf && _colMoreThanHalf) {
    _quad = 3;
  }
  return _quad;
}

function makeRow(rowIndex: number) {
  const _row = new Row(null as any);
  // eslint-disable-next-line no-plusplus
  for (let colIndex = 0; colIndex < DIMENSION; colIndex++) {
    const _quadIndex = calculateQuad(rowIndex, colIndex) ?? 0;
    const _cell = new Cell(rowIndex, colIndex, _quadIndex, 0);
    _row.addCell(_cell);
  }
  return _row;
}

/**
 * Construct a blank sudoku matrix with a given dimension.
 */
// eslint-disable-next-line no-unused-vars
function makeMatrix() {
  const _matrix = new Matrix(null as any);
  // eslint-disable-next-line no-plusplus
  for (let rowIndex = 0; rowIndex < DIMENSION; rowIndex++) {
    const _row = makeRow(rowIndex);
    _matrix.addRow(_row);
  }
  return _matrix;
}

/**
 * "sophisticated error handling"
 * @param {*} errorMessage
 */
function reportError(errorMessage: string) {
  console.error(errorMessage);
}

/**
 * Returns all existing values in a given row
 * @param {*} row
 */
function valuesInRow(row: number, matrix: Cell[][]) {
  let _values: number[] = [];
  matrix[row].forEach((cell) => {
    // todo: needs null checking...
    if (cell.value != null) {
      _values = _values.concat(cell.value);
    }
  });
  return _values;
}

/**
 * Return all existing values in a given column.
 * @param {*} col
 */
function valuesInColumn(col: number, matrix: Cell[][]) {
  let _values: number[] = [];
  // for..in bc we want to iterate over collection indices
  // eslint-disable-next-line no-restricted-syntax
  for (const _row in matrix) {
    if (matrix[_row][col].value != null) {
      _values = _values.concat(matrix[_row][col].value);
    }
  }
  return _values;
}

/**
 * Returns all values in a given quadrant
 * @param {*} quad
 */
function valuesInQuadrant(quad: number, matrix: Cell[][]) {
  let _values: number[] = [];
  matrix.forEach((row: Cell[]) => {
    row.forEach((cell: Cell) => {
      if (cell.quadrant === quad && cell.value != null) {
        _values = _values.concat(cell.value);
      }
    });
  });
  return _values;
}

/**
 * Returns possible (non-conflicting) values for a given cell.
 * The cell contains all relevant information to locate itself.
 * @param {*} cell
 */
function getPossibleValues(cell: Cell, matrix: Cell[][]) {
  let _possibleValues: number[] = [];

  // matrix class with these methods? to just ask the matrix
  const _row = valuesInRow(cell.row, matrix);
  const _column = valuesInColumn(cell.column, matrix);
  const _quadrant = valuesInQuadrant(cell.quadrant, matrix);

  VALUES.forEach((value: number) => { // what the heck was going on here
    if (_row.indexOf(value) < 0
      && _column.indexOf(value) < 0
      && _quadrant.indexOf(value) < 0) {
      _possibleValues = _possibleValues.concat(value);
    }
  });
  return _possibleValues;
}

/**
 * Where the magic happens
 */
export default function solve(matrix: Cell[][]) {
  matrix.forEach((row) => {
    row.forEach((cell) => {
      if (cell.value == null) {
        const _possibleValues = getPossibleValues(cell, matrix);
        // what happens when there are no possible values?
        if (_possibleValues.length <= 0) {
          // todo: backtracking...
          reportError(`No possible values for cell (row:${cell.row}, col:${cell.column}). Unsolved.`);
          return;
        }
        // eslint-disable-next-line prefer-destructuring
        cell.value = _possibleValues[0];
      }
    });
  });
  console.log('...');
  console.log('Finished Solving.');
  printNice(matrix);
}
