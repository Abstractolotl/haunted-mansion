import { Interaction, InteractionBlueprint } from "./Interaction";
import { GameObject, GameObjectBlueprint } from "./GameObject";


export type RoomBlueprint = {
    name: string;
    displayName: string;
    persistence?: boolean;
    background?: string;
    objects?: GameObjectBlueprint[];
    interactions?: InteractionBlueprint[];
}

export class Room {
    name: string;
    path: string;
    displayName?: string;
    persistence?: boolean;
    background?: string;
    objects: { [key: string]: GameObject } = {};
    interactions: Interaction[] = [];
    private loaded: boolean = false;

    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;

        // start loading the room asynchonously
        this.loadRoom();
    }
    
    /**
     * Load the room from the server
     * @returns A promise that resolves when the room has been loaded
     * @throws An error if the room could not be loaded
     */
    async loadRoom(): Promise<void> {
        console.log(`🚪 Loading room: ${this.name}`);
        
        let path = "config/" + this.path;
        let response = await fetch(path);
        if (!response.ok) {
            throw new Error(`❌🚪 Failed to load Room from ${path}: ${response.statusText}`);
        }
        let room: RoomBlueprint = await response.json();

        this.displayName = room.displayName;
        this.persistence = room.persistence;
        this.background = room.background;

        for (let object of room.objects || []) {
            this.objects[object.name] = new GameObject(object);
        }

        for (let interaction of room.interactions || []) {
            this.interactions.push(new Interaction(interaction));
        }

        this.loaded = true;
        console.log(`✔️🚪 Room loaded: ${this.name}`);
    }

    public hasLoaded(): boolean {
        return this.loaded;
    }

    public toJSON(): RoomBlueprint {
        if (!this.loaded) throw new Error(`Room ${this.name} has not loaded yet`);
        return {
            name: this.name,
            displayName: this.displayName || this.name,
            persistence: this.persistence,
            background: this.background,
            objects: Object.values(this.objects).map((object) => object.toJSON()),
            interactions: this.interactions.map((interaction) => interaction.toJSON())
        };
    }

    public getObjects(): GameObject[] {
        if (!this.loaded) throw new Error(`Room ${this.name} has not loaded yet`);        
        return Object.values(this.objects);
    }

    public getObject(name: string): GameObject {
        if (!this.loaded) throw new Error(`Room ${this.name} has not loaded yet`);
        if (!this.objects[name]) {
            throw new Error(`Object ${name} not found in room ${this.name}`);
        }
        return this.objects[name];
    }
}