import {Dimensions} from "@/types";
import {FileParser} from "@/lib/file-parser";

export class Grid {

    private element: HTMLElement;
    private rows: Row[] = [];

    private dimension: Dimensions;
    private readonly size: number;

    constructor(dimension: Dimensions, size: number, className: string = 'grid') {
        this.element = document.createElement('div');
        this.element.classList.add(className);

        this.dimension = dimension;
        this.size = size;

        this.createRows();
    }

    public getElement() {
        return this.element;
    }

    private createRows() {
        for (let i = 0; i < this.dimension.height; i++) {
            const row= new Row(this.dimension.width, this.size);
            this.element.appendChild(row.getElement());
            this.rows.push(row);
        }
        this.rows.reverse()
    }

    public draw(element: string, x: number, y: number) {
        const row = this.rows[y];
        if (row) {
            row.draw(element, x);
        }
    }

    public drawFile(file: string, x: number, y: number) {
        import(`@/assets/${file}`).then((file) => {
            let matrix = FileParser.parse(file.default)
            matrix.reverse()

            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[i].length; j++) {
                    console.log(matrix[i][j] + ' ' + (x + j) + ' ' + (y + i))
                    this.draw(matrix[i][j], x + j, y + i)
                }
            }
        });
    }

}

export class Row {

    private element: HTMLElement;
    private columns: HTMLElement[] = [];

    constructor(width: number, size: number) {
        this.element = document.createElement('div');
        this.element.classList.add('row');
        for (let i = 0; i < width; i++) {
            const column = document.createElement('div');
            column.classList.add('cell');

            column.style.width = `${size}px`;
            column.style.height = `${size}px`;

            this.element.appendChild(column);
            this.columns.push(column);
        }
    }

    public getElement() {
        return this.element;
    }

    public draw(element: string, x: number) {
        const column = this.columns[x];
        if (column) {
            column.innerText = element;
        }
    }

    public clear() {
        this.columns.forEach(column => {
            column.innerText = '';
        });
    }
}