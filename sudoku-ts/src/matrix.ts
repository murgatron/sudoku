import Row from './row';

export default class Matrix {
    private rows;

    constructor(_rows: Row[]) {
      this.rows = _rows;
    }

    /**
     * Add a row to the matrix.
     * @param {*} _newRow
     */
    addRow(_newRow: Row) {
      this.rows = this.rows.concat(_newRow);
    }
}
