export type Dimensions = {
    width: number;
    height: number;
}

export type GridConfig = {
    width: number;
    height: number;
    size: number;
}

export type GameConfig = {
    entryRoomId: string;
    startingItems?: string[];
    interface: InterfaceConfig;
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