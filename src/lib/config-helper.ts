import {GameConfig} from "@/types";

export class ConfigHelper {

    private gameConfig: GameConfig | undefined;
    public async load() {
        let response = await fetch('./config/game.json');
        let config = await response.json();
        this.gameConfig = config as GameConfig;
    }

    public constructor(config: GameConfig) {
        this.gameConfig = config;
    }

    getSceneBorder() {
        return this.gameConfig?.settings.interface.scene!;
    }

    getInventorySize() {
        return this.gameConfig?.settings.interface.inventory!;
    }

    getActionLogSize() {
        return this.gameConfig?.settings.interface.actionLog!;
    }

    getPadding() {
        return this.gameConfig?.settings.interface.padding || 0;
    }

    getStartingItems() {
        return this.gameConfig?.settings.startingItems || [];
    }
}