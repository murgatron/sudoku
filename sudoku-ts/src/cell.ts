export default class Cell {
  public row: number;

  public column: number;

  public quadrant: number;

  public value: number;

  constructor(_row: number, _column: number, _quadrant: number, _value: number) {
    this.row = _row;
    this.column = _column;
    this.quadrant = _quadrant;
    this.value = _value;
  }
}
