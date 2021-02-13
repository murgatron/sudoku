import Cell from './cell';

export default class Row {
    public cells;

    constructor(_cells:Cell[]) {
      this.cells = _cells;
    }

    /**
     * Add cell to the row.
     * @param {*} _newCell
     */
    addCell(_newCell: Cell) {
      this.cells = this.cells.concat(_newCell);
    }
}
