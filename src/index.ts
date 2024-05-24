import "./css/style.scss";
import Background from "./elements/background";
import {Grid} from "@/elements/grid";
import {Config} from "@/lib/config";
import {Scale} from "@/lib/scale";
import { Game } from "./game";

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

    // Logic to draw the game border should be in the layer handling the border
    let padding = CONFIG.getPadding();
    let gameSizeX = CONFIG.getSceneBorder()[0] + (2 * padding);
    let gameSizeY = CONFIG.getSceneBorder()[1] + (2 * padding);
    let inventoryHeight = CONFIG.getInventorySize().rows * (CONFIG.getInventorySize().slotSize[1] + padding) + (2 * padding);
    let actionLogWidth = CONFIG.getActionLogSize() + (2 * padding);
    
    // starting coordinates for the game
    let gamePosX = 1 + padding;
    let gamePosY = inventoryHeight + 2 + padding;

    background.drawFile('outside_background.txt', gamePosX, gamePosY);
    testGrid.drawFile('objects/small_window_broken.txt', gamePosX + 32, gamePosY + 6);
    //background.drawBorder(gameSizeX, gameSizeY, inventoryHeight, actionLogWidth)
    game.append(testGrid.getElement());


    let gameObject = new Game('./config/game.json');
});