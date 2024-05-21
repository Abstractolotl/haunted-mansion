import "./css/style.scss";
import Background from "./elements/background";
import {Grid} from "@/elements/grid";

const GRID_WIDTH =  1920; // 96 cells with 20px
const GRID_HEIGHT = 1080; // 54 cells with 20px cell size
const GRID_SIZE = 20;

document.addEventListener('DOMContentLoaded', () => {
    let game = document.getElementById('game');
    if (!game) {
        alert('Game Container not found');
        return;
    }

    const body = document.getElementsByTagName('body')[0];

    const HEIGHT = body.clientHeight;
    const WIDTH = body.clientWidth;

    const SIZE = Math.min(WIDTH / GRID_WIDTH, HEIGHT / GRID_HEIGHT) * GRID_SIZE;
    document.body.style.fontSize = `${SIZE}px`;

    const GRID_ROWS = GRID_HEIGHT / GRID_SIZE;
    const GRID_COLUMNS = GRID_WIDTH / GRID_SIZE;

    let background = new Background(GRID_COLUMNS, GRID_ROWS, SIZE - 2, game);
    let testGrid = new Grid({width: GRID_COLUMNS, height: GRID_ROWS}, SIZE - 2);

    testGrid.drawFile('outside_background.txt', 0, 20);
    game.append(testGrid.getElement());
});

document.addEventListener('resize', () => {
    // TODO Rerender the grid
});