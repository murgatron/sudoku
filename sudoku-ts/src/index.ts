import solve from './solver';
import Cell from './cell';
import printNice from './print';

// TODO: move to data files
const matrix = [
    [ new Cell(0,0,0, 1), new Cell(0,1,0, null), new Cell(0,2,1, 2), new Cell(0,3,1, null) ],
    [ new Cell(1,0,0, null), new Cell(1,1,0, null), new Cell(1,2,1, null), new Cell(1,3,1, null) ],
    [ new Cell(2,0,2, null), new Cell(2,1,2, null), new Cell(2,2,3, null), new Cell(2,3,3, null) ],
    [ new Cell(3,0,2, null), new Cell(3,1,2, null), new Cell(3,2,3, null), new Cell(3,3,3, 1) ]
]

// from the internet
// const matrix = [
//     [ new Cell(0,0,0, null), new Cell(0,1,0, null), new Cell(0,2,1, 1), new Cell(0,3,1, null) ],
//     [ new Cell(1,0,0, 4), new Cell(1,1,0, null), new Cell(1,2,1, null), new Cell(1,3,1, null) ],
//     [ new Cell(2,0,2, null), new Cell(2,1,2, null), new Cell(2,2,3, null), new Cell(2,3,3, 2) ],
//     [ new Cell(3,0,2, null), new Cell(3,1,2, 3), new Cell(3,2,3, null), new Cell(3,3,3, null) ]
// ]

//const matrix = makeMatrix();



//cause we're doing 4x4...
const values = [
    1, 2, 3, 4
]

/**
 * startup
 */
function main() {
    // todo: pass in dimension
    console.log("Starting matrix:");
    printNice(matrix);
    solve(matrix);
}

main();