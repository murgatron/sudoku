import Cell from './cell';
import Matrix from './matrix';
import printNice from './print';
import Row from './row';

const dimension = 4; 

/**
 * Construct a blank sudoku matrix with a given dimension.
 */
function makeMatrix(){
    let _matrix = new Matrix();
    for(let rowIndex=0; rowIndex<dimension; rowIndex++){
        let _row = makeRow(rowIndex);
        _matrix.addRow(_row);    
    }
    return _matrix;
}

function makeRow(rowIndex){
    let _row = new Row();
    for(let colIndex=0; colIndex<dimension; colIndex++){
        let _quadIndex = calculateQuad(rowIndex, colIndex);
        let _cell = new Cell(rowIndex, colIndex, _quadIndex, null);
        _row.addCell(_cell);
    }
    return _row;
}

/**
 * Calculate the quadrant for the row and column. 
 * @param {*} row 
 * @param {*} col 
 */
function calculateQuad(row, col) {
    let _quad = null;
    let _rowLessThanHalf = row <= dimension/2-1;
    let _rowMoreThanHalf = row > dimension/2;
    let _colLessThanHalf = col <= dimension/2-1;
    let _colMoreThanHalf = col > dimension/2;
    
    // 1: lte row/2-1, lte col/2-1
    if (_rowLessThanHalf && _colLessThanHalf){
        _quad = 0;
    }
    // 2: gt row/2, gt col/2
    if (_rowLessThanHalf && _colMoreThanHalf) {
        _quad = 1;
    }
    // 3: gt row/2, lte col/2-1
    if (_rowMoreThanHalf && _colLessThanHalf){
        _quad = 2;
    }
    // 4: gt row/2, gt col/2
    if (_rowMoreThanHalf && _colMoreThanHalf) {
        _quad = 3;
    }
    return _quad; 
}

/**
 * "sophisticated error handling"
 * @param {*} errorMessage 
 */
function reportError(errorMessage) {
    console.error(errorMessage);
}

/**
 * Returns possible (non-conflicting) values for a given cell.
 * The cell contains all relevant information to locate itself. 
 * @param {*} cell 
 */
function getPossibleValues(cell, matrix) {
    let _possibleValues = [];

    // matrix class with these methods? to just ask the matrix 
    let _row = valuesInRow(cell.row, matrix);
    let _column = valuesInColumn(cell.column, matrix);
    let _quadrant = valuesInQuadrant(cell.quadrant, matrix);

    //angular.merge...
    values.forEach((value) => {
        if (_row.indexOf(value)<0
        && _column.indexOf(value)<0
        && _quadrant.indexOf(value)<0) {
            _possibleValues = _possibleValues.concat(value);
        }
    });
    return _possibleValues;
}

/**
 * Returns all existing values in a given row
 * @param {*} row 
 */
function valuesInRow(row, matrix) {
    let _values = [];
    matrix[row].forEach((cell) => {
        //todo: needs null checking...
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
function valuesInColumn(col, matrix) {
    let _values = [];
    // for..in bc we want to iterate over collection indices
    for(let _row in matrix){
        if (matrix[_row][col].value != null){
            _values = _values.concat(matrix[_row][col].value);
        }
    }
    return _values;
}

/**
 * Returns all values in a given quadrant
 * @param {*} quad 
 */
function valuesInQuadrant(quad, matrix) {
    let _values = [];
    matrix.forEach((row) => { 
        matrix.forEach((cell) => { 
            if(cell.quadrant == quad && cell.value != null){
                _values = _values.concat(cell.value);
            }
        });
    });
    return _values;
}

/**
 * Where the magic happens
 */
export default function solve(matrix:Cell[][]){
    matrix.forEach((row) => {
        row.forEach((cell) =>{
            if (cell.value == null){
                let _possibleValues = getPossibleValues(cell, matrix);
                //what happens when there are no possible values? 
                if (_possibleValues.length <= 0){
                    // todo: backtracking...
                    reportError(`No possible values for cell (row:${cell.row}, col:${cell.column}). Unsolved.`);
                    return;
                }
                cell.value = _possibleValues[0];
            }
        });
    });
    console.log("...");
    console.log("Finished Solving.");
    printNice(matrix);
}