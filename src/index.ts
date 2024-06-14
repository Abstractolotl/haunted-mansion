import "./css/style.scss";
import { Game } from "./game";


document.addEventListener('DOMContentLoaded', async () => {
    let gameObject = new Game();
    await gameObject.start('./config/game.json');
});