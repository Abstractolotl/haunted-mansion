export type Dimensions = {
    width: number;
    height: number;
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
    indexPath: string;
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


// notes
export type Note = {
    name: string;
    displayName: string;
    text: string;
}

export type Action = {
    type: string;
    options?: any;
    trigger(/*gameContext: ????*/): void; // TODO: what should the type of gameContext be? The action should be able to modify the game state
}

export type Condition = {
    type: string;
    options?: any;
    check(/*gameContext: ????*/): boolean; // TODO: what should the type of gameContext be? The condition should be able to check the game state
}
