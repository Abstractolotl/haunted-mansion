import "./css/style.scss";

import Background from "./elements/background";

const GRID_WIDTH =  1920;
const GRID_HEIGHT = 1080;
const GRID_SIZE = 20;

document.addEventListener('DOMContentLoaded', () => {
    let game = document.getElementById('game');
    if (!game) {
        alert('Game Container not found');
        return;
    }

    const body = document.getElementsByTagName('body')[0];

    const HEIGHT = document.getElementsByTagName('body')[0].clientHeight;
    const WIDTH = document.getElementsByTagName('body')[0].clientWidth;
    const SIZE = Math.min(WIDTH / GRID_WIDTH, HEIGHT / GRID_HEIGHT) * GRID_SIZE;

    document.body.style.fontSize = `${SIZE}px`;

    let background = new Background(WIDTH, HEIGHT, SIZE, game);
});