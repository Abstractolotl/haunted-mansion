import {Grid} from "./grid";
import {GridConfig} from "@/types";

export default class Background {

    private parent: HTMLElement;

    private gridConfig: GridConfig;
    private grid: Grid;

    constructor(gridConfig: GridConfig, sceneBorder: number[], parent: HTMLElement) {
        this.gridConfig = gridConfig;
        this.parent = parent;

        this.grid = new Grid(this.gridConfig, 'background');
        this.parent.appendChild(this.grid.getElement());

        this.fill({x: 0, y: sceneBorder[1]}, {x: sceneBorder[0], y: sceneBorder[1]}, '-')
        this.fill({x: sceneBorder[0], y: 0}, {x: sceneBorder[0], y: this.gridConfig.height}, '|')

        this.drawGameBorder(sceneBorder)
    }

    private drawGameBorder(sceneBorder: number[]) {
        this.fill({x: 0, y: 0}, {x: 0, y: this.gridConfig.height}, '|')
        this.fill({x: this.gridConfig.width - 1, y: 0}, {x: this.gridConfig.width - 1 , y: this.gridConfig.height}, '|')

        this.fill({x: 0, y: 0}, {x: this.gridConfig.width - 1, y: 0}, '_')
        this.fill({x: 0, y: this.gridConfig.height - 1}, {x: this.gridConfig.width - 1, y: this.gridConfig.height - 1}, '-')

        this.draw('+', 0, sceneBorder[1]);
        this.draw('+', sceneBorder[0], sceneBorder[1]);

        this.draw('.', sceneBorder[0], 0);
        this.draw('.', sceneBorder[0], this.gridConfig.height - 1);

        this.draw('.', 0, 0);
        this.draw('.', this.gridConfig.width - 1, 0);

        this.draw('.', 0, this.gridConfig.height - 1);
        this.draw('.', this.gridConfig.width - 1, this.gridConfig.height - 1);
    }

    public getGrid(){
        return this.grid;
    }

    public draw(element: string, x: number, y: number) {
        this.grid.draw(element, x, y);
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