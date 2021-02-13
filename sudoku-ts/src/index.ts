import { ArgumentParser } from 'argparse';
import loadPuzzle from './loader';
import Solver from './solver/solver';

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
  group.add_argument('-n', '--nine',
    {
      help: 'solve the default 9x9 puzzle ',
      action: 'store_true',
    });
  group.add_argument('-t', '--twelve',
    {
      help: 'solve the default 12x12 puzzle ',
      action: 'store_true',
    });
  group.add_argument('-s', '--sixteen',
    {
      help: 'solve the default 16x16 puzzle ',
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
