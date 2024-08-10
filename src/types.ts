import { Game } from "./game";

export class ConfigurationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ConfigurationError";
    }
}

export type GridConfig = {
    width: number;
    height: number;
    size: number;
}

// game.json
export type GameConfig = {
    entryRoomId: string;
    startingItems?: string[];
    interface: InterfaceConfig;
    indexPath?: string;
}

export type InterfaceConfig = {
    scene: number[];
    actionLog: number;
    inventory: {
        rows: number;
        slotSize: number[];
    },
    padding?: number;
}

// index
export type AssetIndex = {
    rooms?: Entry[];
    items?: Entry[];
    notes?: Entry[];
    textures?: Entry[];
}

export type Entry = {
    name: string;
    path: string;
}

export type Action = {
    type: string;
    options?: any;

    /**
     * Trigger the action
     * @param gameContext The game context
     */
    trigger(gameContext: Game): void; // TODO: what should the type of gameContext be? The action should be able to modify the game state
}

export type Condition = {
    type: string;
    options?: any;

    /**
     * Check the condition
     * @param gameContext The game context
     * @returns True if the condition is met
     */
    check(gameContext: Game): boolean; // TODO: what should the type of gameContext be? The condition should be able to check the game state
}
