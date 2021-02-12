export default class Matrix {
    private rows;

    constructor(_rows){
        this.rows = _rows; 
    }
    /**
     * Add a row to the matrix. 
     * @param {*} _newRow 
     */
    addRow(_newRow) {
        this.rows = this.rows.concat(_newRow);
    }
}