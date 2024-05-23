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
    startingItems: string[];
    interface: {
        scene: number[];
        actionLog: number[];
        inventory: {
            rows: number;
            slotSize: number[];
        }
    }
}