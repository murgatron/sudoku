export default class Row {
    public cells;

    constructor(_cells){
        this.cells = _cells;
    }
    /**
     * Add cell to the row. 
     * @param {*} _newCell 
     */
    addCell(_newCell){
        this.cells = this.cells.concat(_newCell);
    }
}