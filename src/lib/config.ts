import {GameConfig} from "@/types";

export class Config {

    private gameConfig: GameConfig | undefined;

    public async load() {
        let response = await fetch('./config/game.json');
        let config = await response.json();
        this.gameConfig = config as GameConfig;
    }

    getSceneBorder() {
        return this.gameConfig?.interface.scene!;
    }

}