import { ArgumentParser } from 'argparse';
import Cell from './solver/cell';
import loadPuzzle from './loader';
import Solver from './solver/solver';

// eslint-disable-next-line no-unused-vars
const matrix = [
  [new Cell(0, 0, 0, 1), new Cell(0, 1, 0, 0), new Cell(0, 2, 1, 2), new Cell(0, 3, 1, 0)],
  [new Cell(1, 0, 0, 0), new Cell(1, 1, 0, 0), new Cell(1, 2, 1, 0), new Cell(1, 3, 1, 0)],
  [new Cell(2, 0, 2, 0), new Cell(2, 1, 2, 0), new Cell(2, 2, 3, 0), new Cell(2, 3, 3, 0)],
  [new Cell(3, 0, 2, 0), new Cell(3, 1, 2, 0), new Cell(3, 2, 3, 0), new Cell(3, 3, 3, 1)],
];

// from the internet
// const matrix = [
//     [ new Cell(0,0,0, null), new Cell(0,1,0, null), new Cell(0,2,1, 1), new Cell(0,3,1, null) ],
//     [ new Cell(1,0,0, 4), new Cell(1,1,0, null), new Cell(1,2,1, null), new Cell(1,3,1, null) ],
//     [ new Cell(2,0,2, null), new Cell(2,1,2, null), new Cell(2,2,3, null), new Cell(2,3,3, 2) ],
//     [ new Cell(3,0,2, null), new Cell(3,1,2, 3), new Cell(3,2,3, null), new Cell(3,3,3, null) ]
// ]

/**
 * startup
 */
function main() {
  const parser = new ArgumentParser({
    description: 'asdf',
  });

  const group = parser.add_mutually_exclusive_group();
  group.add_argument('-f', '--four',
    {
      help: 'solve the default 4x4 puzzle ',
      action: 'store_true',
    });
  group.add_argument('-p', '--puzzle',
    {
      help: 'path to a .json puzzle file',
    });
  group.add_argument('-r', '--random',
    {
      help: 'generate a random puzzle, then solve it.',
    });

  const loadedPuzzle = loadPuzzle(parser.parse_args());

  const solver = Solver.create(JSON.parse(loadedPuzzle));

  solver.solve();
}

main();
