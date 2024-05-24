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

    getInventorySize() {
        return this.gameConfig?.interface.inventory!;
    }

    getActionLogSize() {
        return this.gameConfig?.interface.actionLog!;
    }

    getPadding() {
        return this.gameConfig?.interface.padding || 0;
    }

    getStartingItems() {
        return this.gameConfig?.startingItems || [];
    }
}