import ICell from '../interfaces/ICell';

export default class Cell implements ICell {
  constructor(
    public readonly row: number,
    public readonly column: number,
    public readonly quadrant: number,
    public value: number,
    public readonly isPuzzleValue: boolean,
    public lastIndex: number 
  ) { }
}
