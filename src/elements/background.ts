import {Grid} from "./grid";

export default class Background {
    public width: number;
    public height: number;

    private parent: HTMLElement;

    private element: HTMLElement;
    private grid: Grid;

    constructor(width: number, height: number, size: number, parent: HTMLElement) {
        this.width = width;
        this.height = height;

        this.parent = parent;

        this.element = document.createElement('div');
        this.element.classList.add('background');
        this.parent.appendChild(this.element);

        this.grid = new Grid({width: this.width, height: this.height}, size);
        this.element.appendChild(this.grid.getElement());

        this.fill({x: 0, y: 20}, {x: 84, y: 20}, '_')
        this.fill({x: 85, y: 0}, {x: 85, y: this.height / size}, '|')
    }

    public clear() {
    }

    public fill(cordStart: {x: number, y: number}, cordEnd: {x: number, y: number}, symbol: string = '-') {
        if (cordStart.x == cordEnd.x) {
            for (let j = cordStart.y; j <= cordEnd.y; j++){
                this.grid.draw(symbol, cordStart.x, j);
            }
        }
        for (let i = cordStart.x; i <= cordEnd.x; i++){
            if (cordStart.y == cordEnd.y) {
                this.grid.draw(symbol, i, cordStart.y);
                continue;
            }
            for (let j = cordStart.y; j <= cordEnd.y; j++){
                this.grid.draw(symbol, i, j);
            }
        }
    }
}