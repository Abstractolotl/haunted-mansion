import {Grid} from "./grid";
import {GameConfig, GridConfig} from "@/types";
import {ConfigHelper} from "@/lib/config-helper";

export default class Background {

    private parent: HTMLElement;

    private gridConfig: GridConfig;
    private grid: Grid;

    private inventorySize: { rows: number; slotSize: number[]; };
    private inventoryStartX: number = 0;

    constructor(gridConfig: GridConfig, config: ConfigHelper, parent: HTMLElement) {
        this.gridConfig = gridConfig;
        this.parent = parent;

        this.inventorySize = config.getInventorySize();
        this.inventoryStartX = config.getSceneBorder()[0];

        this.grid = new Grid(this.gridConfig, 'background');
        this.parent.appendChild(this.grid.getElement());

        this.drawInventoryBorder()
        this.drawGameBorder(config.getSceneBorder())
    }

    private drawGameBorder(sceneBorder: number[]) {
        this.fill({x: 0, y: sceneBorder[1]}, {x: sceneBorder[0], y: sceneBorder[1]}, '-')
        this.fill({x: sceneBorder[0], y: 0}, {x: sceneBorder[0], y: this.gridConfig.height}, '|')

        this.fill({x: 0, y: 0}, {x: 0, y: this.gridConfig.height}, '|')
        this.fill({x: this.gridConfig.width - 1, y: 0}, {x: this.gridConfig.width - 1 , y: this.gridConfig.height}, '|')

        this.fill({x: 0, y: 0}, {x: this.gridConfig.width - 1, y: 0}, '_')
        this.fill({x: 0, y: this.gridConfig.height - 1}, {x: this.gridConfig.width - 1, y: this.gridConfig.height - 1}, '_')

        this.draw('+', 0, sceneBorder[1]);
        this.draw('+', sceneBorder[0], sceneBorder[1]);

        this.draw('.', sceneBorder[0], 0);
        this.draw('.', sceneBorder[0], this.gridConfig.height - 1);

        this.draw('.', 0, 0);
        this.draw('.', this.gridConfig.width - 1, 0);

        this.draw('.', 0, this.gridConfig.height - 1);
        this.draw('.', this.gridConfig.width - 1, this.gridConfig.height - 1);
    }

    public drawInventoryBorder(activeSlot?: number) {
        let maxX = this.inventoryStartX - 2;
        let start = {x: 2, y: 1}

        let columns = Math.floor((maxX - start.x) / (this.inventorySize.slotSize[0] + 1))

        for (let y = 0; y < this.inventorySize.rows; y++) {
            for (let x = 0; x < columns; x++) {
                let slot = (y * columns) + x;
                let borderY = '|'; let borderX = '-';
                if (activeSlot !== undefined && slot === activeSlot) {
                    borderY = '#'
                    borderX = '='
                }

                this.draw('+', start.x, start.y)
                this.fill({x: start.x + 1, y: start.y}, {x: start.x + this.inventorySize.slotSize[0], y: start.y}, '-')
                this.draw('+', start.x + this.inventorySize.slotSize[0] + 1, start.y)

                this.fill({x: start.x, y: start.y + 1}, {x: start.x, y: start.y + this.inventorySize.slotSize[1]}, '|')
                this.fill({x: start.x + this.inventorySize.slotSize[0] + 1, y: start.y + 1}, {x: start.x + this.inventorySize.slotSize[0] + 1, y: start.y + this.inventorySize.slotSize[1]}, '|')

                this.draw('+', start.x, start.y + this.inventorySize.slotSize[1] + 1)
                this.fill({x: start.x + 1, y: start.y + this.inventorySize.slotSize[1] + 1}, {x: start.x + this.inventorySize.slotSize[0], y: start.y + this.inventorySize.slotSize[1] + 1}, '-')
                this.draw('+', start.x + this.inventorySize.slotSize[0] + 1, start.y + this.inventorySize.slotSize[1] + 1)

                start.x += this.inventorySize.slotSize[0] + 1;
            }
            start.x = 2;
            start.y += this.inventorySize.slotSize[1] + 1;
        }

        if (activeSlot !== undefined) {
            let x = (activeSlot % columns) * (this.inventorySize.slotSize[0] + 1) + 2;
            let y = Math.floor(activeSlot / columns) * (this.inventorySize.slotSize[1] + 1) + 1;

            this.fill({x: x, y: y + 1}, {x: x, y: y + this.inventorySize.slotSize[1]}, '#')
            this.fill({x: x + this.inventorySize.slotSize[0] + 1, y: y + 1}, {x: x + this.inventorySize.slotSize[0] + 1, y: y + this.inventorySize.slotSize[1]}, '#')
            this.fill({x: x + 1, y: y}, {x: x + this.inventorySize.slotSize[0], y: y}, '=')
            this.fill({x: x + 1, y: y + this.inventorySize.slotSize[1] + 1}, {x: x + this.inventorySize.slotSize[0], y: y + this.inventorySize.slotSize[1] + 1}, '=')
        }

    }

    // TODO: where should the border actually be drawn? What layer should it be on?
    public drawBorder(sizeX: number, sizeY: number, inventoryHeight: number, actionLogWidth: number) {
        // draw horizontal lines
        for (let x = 0; x < sizeX + actionLogWidth + 1; x++) {
            this.draw('-', x, 0);
            this.draw('-', x, inventoryHeight + sizeY + 2);
        }
        for (let x = 1; x < sizeX + 1; x++) {
            this.draw('-', x, inventoryHeight + 1);
        }

        // draw vertical lines
        for (let y = 1; y < sizeY + inventoryHeight + 2; y++) {
            this.draw('|', 0, y);
            this.draw('|', sizeX, y);
            this.draw('|', sizeX + actionLogWidth + 1, y);
        }
        
        // draw corners:
        // bottom row
        this.draw('+', 0, 0);
        this.draw('+', sizeX, 0);
        this.draw('+', sizeX + actionLogWidth + 1, 0);

        // middle row
        this.draw('+', 0, inventoryHeight + 1);
        this.draw('+', sizeX, inventoryHeight + 1);

        // top row
        this.draw('+', 0, sizeY + inventoryHeight + 2);
        this.draw('+', sizeX, sizeY + inventoryHeight + 2);
        this.draw('+', sizeX + actionLogWidth + 1, sizeY + inventoryHeight + 2);
    }

    public getGrid(){
        return this.grid;
    }

    public draw(element: string, x: number, y: number) {
        this.grid.draw(element, x, y);
    }

    public drawFile(file: string, x: number, y: number) {
        this.grid.drawFile(file, x, y);
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