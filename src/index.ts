import "./css/style.scss";
import { Game } from "./game";


document.addEventListener('DOMContentLoaded', async () => {
    let gameObject = new Game('./config/game.json');
    await gameObject.start('./config/game.json');
});