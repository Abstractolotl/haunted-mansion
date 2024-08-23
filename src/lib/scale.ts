import {Grid} from "@/elements/grid";

const GRID_WIDTH =  1920; // 96 cells with 20px
const GRID_HEIGHT = 1080; // 54 cells with 20px cell size
const GRID_SIZE = 20;
const GRID_PADDING = 0;

export class Scale {

    private size: number = GRID_SIZE;
    private columns: number = GRID_WIDTH / GRID_SIZE;
    private rows: number = GRID_HEIGHT / GRID_SIZE;

    private grids: Grid[] = [];

    constructor(){
        // Calculate the size of the grid on load
        document.addEventListener('DOMContentLoaded', () => {
            this.calculateSize();
            this.updateSize()
        });

        // Recalculate the size of the grid on resize
        window.onresize = () => {
            this.calculateSize();
            this.updateSize();
        };
    }

    /**
     * Add a grid to the scale
     * @param grid
     */
    public addGrid(grid: Grid){
        this.grids.push(grid);
    }

    /**
     * Remove a grid from the scale
     * @param grid
     */
    public removeGrid(grid: Grid){
        let index = this.grids.indexOf(grid);
        if (index > -1){
            this.grids.splice(index, 1);
        }
    }

    /**
     * Get the grid configuration
     */
    public getGridConfig(){
        return {
            width: this.columns * 2,
            height: this.rows,
            size: this.size
        }
    }

    public applySize() {
        this.calculateSize();
        this.updateSize();
    }

    /**
     * Update the size of the font and the grids
     * @private
     */
    private updateSize(){
        document.body.style.fontSize = `${this.size}px`;
        for (let grid of this.grids){
            grid.resize(this.size);
        }
    }

    /**
     * Calculate the size of the grid
     * @private
     */
    private calculateSize(){
        let body = document.getElementsByTagName('body')[0];
        let height = body.clientHeight;
        let width = body.clientWidth;

        this.size = Math.min(width / GRID_WIDTH, height / GRID_HEIGHT) * GRID_SIZE;
        this.rows = GRID_HEIGHT / GRID_SIZE;
        this.columns = GRID_WIDTH / GRID_SIZE;
    }

}