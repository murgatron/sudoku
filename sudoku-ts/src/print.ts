import Cell from "./cell";
import { DIMENSION } from "./constants";

/**
 * Build the column string based on dimension.
 */
function buildColumnString(){
    // start with 5 spaces
    let _colString = `     `;
    for(let i=0; i<DIMENSION; i++){
        _colString = _colString.concat(`${i} `);
        if (i == (DIMENSION/2-1)){
            // 2 spaces to account for delim
            _colString = _colString.concat(`  `);
        }
    }
    return _colString;
}

/**
 * Print nulls in a nice way
 * @param {*} value 
 */
function printNull(value) {
    return (value == null) ? "-" : value; 
}

/**
 * Print the matrix nicely. Dynamic based on dimension.
 */
export default function printNice(matrix:Cell[][]){
    //for columns
    let _colString = buildColumnString();
    console.log(_colString);

    // now rows
    matrix.forEach((row, rowIndex, matrix) => {
        let _rowString = `${rowIndex}: [ `;
        row.forEach((cell, cellIndex, rows) => {
            _rowString = _rowString.concat(`${printNull(cell.value)} `);
            if (cellIndex == (rows.length/2 - 1)){
                _rowString = _rowString.concat(`| `);
            }
        });
        console.log(`${_rowString}] `);

        //account for vertical delim
        if (rowIndex == (matrix.length/2-1)){
            console.log("   -------------");
        }
    });
}

