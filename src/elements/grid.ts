import {Dimensions, GridConfig} from "@/types";
import {FileParser} from "@/lib/file-parser";

export class Grid {

    private element: HTMLElement;
    private rows: Row[] = [];

    private config: GridConfig;

    constructor(config: GridConfig, className: string = 'grid') {
        this.element = document.createElement('div');
        this.element.classList.add(className);

        this.config = config;
        this.createRows();
    }

    public resize(size: number) {
        this.rows.forEach(row => {
            row.resize(size);
        });
    }

    public clear() {
        this.rows.forEach(row => {
            row.clear();
        });
    }

    public getElement() {
        return this.element;
    }

    private createRows() {
        for (let i = 0; i < this.config.height; i++) {
            const row= new Row(this.config.width, this.config.size);
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
        fetch(`./assets/${file}`).then((response) => {
            return response.text();
        }).then((file) => {
            let matrix = FileParser.parse(file)

            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[i].length; j++) {
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

            column.style.width = `${size/2}px`;
            column.style.height = `${size}px`;

            this.element.appendChild(column);
            this.columns.push(column);
        }
    }

    public resize(size: number) {
        this.columns.forEach(column => {
            column.style.width = `${size}px`;
            column.style.height = `${size}px`;
        });
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