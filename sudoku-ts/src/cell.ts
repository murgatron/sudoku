export default class Cell {
    public row;
    public column;
    public quadrant;
    public value;

    constructor(_row, _column, _quadrant, _value){
        this.row = _row;
        this.column = _column;
        this.quadrant = _quadrant;
        this.value = _value;
    }
}