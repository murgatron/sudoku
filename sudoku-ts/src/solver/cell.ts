import ICell from '../interfaces/ICell';

/* eslint-disable no-unused-vars */
export default class Cell implements ICell {
  constructor(
    public readonly row: number,
    public readonly column: number,
    public readonly quadrant: number,
    public value: number,
    // eslint-disable-next-line no-empty-function
  ) { }
}
