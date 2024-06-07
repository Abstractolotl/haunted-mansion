import { Interaction, InteractionBlueprint } from "../logic/interaction";
import { GameObject, GameObjectBlueprint } from "./game-object";


export type RoomBlueprint = {
    name: string;
    displayName: string;
    persistence?: boolean;
    background?: string;
    objects?: GameObjectBlueprint[];
    interactions?: InteractionBlueprint[];
}

export class Room {
    private name: string;
    private path: string;
    private displayName?: string;
    private persistence?: boolean;
    private background?: string;
    private objects: { [key: string]: GameObject } = {};
    private interactions: Interaction[] = [];
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

    /**
     * Check if the Room has loaded
     * @returns True if the Room has loaded
     */
    public hasLoaded(): boolean {
        return this.loaded;
    }

    /**
     * Check if the Room has loaded
     * @throws An error if the Room has not loaded yet
     */
    public requireLoaded(): void {
        if (!this.loaded) throw new Error(`❌🚪 Room ${this.name} has not loaded yet`);
    }

    /**
     * Get the JSON representation of the Room
     * @returns The JSON representation of the Room
     * @throws An error if the Room has not loaded yet
     */
    public toJSON(): RoomBlueprint {
        this.requireLoaded();
        return {
            name: this.name,
            displayName: this.displayName || this.name,
            persistence: this.persistence,
            background: this.background,
            objects: Object.values(this.objects).map((object) => object.toJSON()),
            interactions: this.interactions.map((interaction) => interaction.toJSON())
        };
    }

    /**
     * Get the objects inside the Room
     * @returns The objects inside the Room
     * @throws An error if the Room has not loaded yet
     */
    public getObjects(): GameObject[] {
        this.requireLoaded();

        return Object.values(this.objects);
    }

    /**
     * Get the interactions of the Room
     * @returns The interactions of the Room
     * @throws An error if the Room has not loaded yet
     */
    public getInteractions(): Interaction[] {
        this.requireLoaded();

        return this.interactions;
    }

    /**
     * Get the display name of the Room
     * @returns The display name of the Room
     */
    public getDisplayName(): string {
        return this.displayName || this.name;
    }

    /**
     * Get the background of the Room
     * @returns The texture name of the background of the Room
     * @throws An error if the Room has not loaded yet
     */
    public getBackground(): string {
        this.requireLoaded();
        
        return this.background || "";
    }

    /**
     * Get an object by name
     * @param name The name of the object
     * @returns The object with the specified name
     * @throws An error if the object does not exist
     */
    public getObject(name: string): GameObject {
        this.requireLoaded();
        if (!this.objects[name]) {
            throw new Error(`Object ${name} not found in room ${this.name}`);
        }
        
        return this.objects[name];
    }
}