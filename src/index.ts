import "./css/style.scss";
import Background from "./elements/background";
import {Grid} from "@/elements/grid";
import {Config} from "@/lib/config";
import {Scale} from "@/lib/scale";

const CONFIG = new Config();
const SCALE = new Scale();

document.addEventListener('DOMContentLoaded', async () => {
    await CONFIG.load();

    let game = document.getElementById('game');
    if (!game) {
        alert('Game Container not found');
        return;
    }


    let background = new Background(SCALE.getGridConfig(), CONFIG.getSceneBorder(), game);
    let testGrid = new Grid(SCALE.getGridConfig());

    SCALE.addGrid(testGrid);
    SCALE.addGrid(background.getGrid());

    testGrid.drawFile('outside_background.txt', 0, 20);
    game.append(testGrid.getElement());
});