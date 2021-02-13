export default interface ICell {
  column: number;
  row: number;
  quadrant: number;
  value: number;
  isPuzzleValue: boolean;
  lastIndex: number;
  // eslint-disable-next-line semi
}
