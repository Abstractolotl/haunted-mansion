import { Item } from "./elements/objects/item";
import { Note } from "./elements/objects/note";
import { Room } from "./elements/objects/room";
import { Texture } from "./elements/objects/texture";
import { AssetIndex, GameConfig } from "./types";
import { Renderer } from "@/lib/renderer";
import { ConfigHelper } from "@/lib/config-helper";
import { GameObject } from "./elements/objects/game-object";
import { VariableHandler } from "./elements/logic/variable-handler";
 
export class Game {
    private index?: AssetIndex;
    private config?: GameConfig;

    private renderer?: Renderer;
    private room?: Room;

    private actionLog: string[] = [];
    private inventory: Item[] = [];
    private selectedInventorySlot: number = 0;

    // assets
    private rooms: { [name: string]: Room } = {};
    private items: { [name: string]: Item } = {};
    private notes: { [name: string]: Note } = {};
    private textures: { [name: string]: Texture } = {};
    private variableHandler: VariableHandler = new VariableHandler();

    async start(configPath: string) {
        console.log("🎮 Initializing game")

        await this.loadAssets(configPath);
        await this.waitForAssets()

        let configHelper = new ConfigHelper(this.config!);
        this.renderer = new Renderer(configHelper, this.textures);

        // Find the starting room
        const startingRoom = this.rooms[this.config!.settings.entryRoomId];
        if (!startingRoom) {
            throw new Error(`❌🎮 Starting room ${this.config!.settings.entryRoomId} not found`);
        }
        this.room = startingRoom;
        console.log("🎮 Starting game in room: " + startingRoom.getDisplayName());
        this.renderer.changeScene(this);
    }

    public goToRoom(roomName: string) {
        const room = this.rooms[roomName];
        if (!room) {
            throw new Error(`❌🎮 Room ${roomName} not found`);
        }
        this.room = room;
        this.renderer!.changeScene(this);
    }

    /**
     * Load all assets for the game
     * @param configPath The path to the game config
     * @returns A promise that resolves when all assets have been loaded
     * @throws An error if any asset could not be loaded
     */
    private async loadAssets(configPath: string) {
        await this.loadGameConfig(configPath);
        await this.loadAssetIndex(this.config!.settings!.indexPath || "index.json");

        // Load all assets
        this.loadTextures();
        this.loadRooms();
        this.loadItems();
        this.loadNotes();

        await this.waitForAssets();
        console.log("🎮 Game assets loaded");
    }

    /**
     * Load the game config from the server
     * @param configPath The path to the game config
     * @returns A promise that resolves when the game config has been loaded
     * @throws An error if the game config could not be loaded
     */
    private async loadGameConfig(configPath: string) {
        console.log("🔧 Loading game config");
        this.config = await fetch(configPath).then(response => response.json());
        if (!this.config) {
            throw new Error("❌🔧 Game config could not be loaded, exiting...");
        }
        console.log("✔️🔧 Game config loaded");
    }

    /**
     * Load the asset index from the server
     * @param indexPath The path to the asset index inside the config folder
     * @returns A promise that resolves when the asset index has been loaded
     * @throws An error if the asset index could not be loaded
     */
    private async loadAssetIndex(indexPath: string) {
        console.log("📚 Loading asset index");
        this.index = await fetch("config/" + indexPath).then(response => response.json());
        if (!this.index) {
            throw new Error("❌📚 Asset index could not be loaded, exiting...");
        }
        console.log("✔️📚 Asset index loaded");
    }

    /**
     * Load all textures from the asset index
     */
    private loadTextures() {
        this.index!.textures!.forEach((texture) => {
            this.textures[texture.name] = new Texture(texture.name, texture.path);
        });
    }

    /**
     * Load all rooms from the asset index
     */
    private loadRooms() {
        this.index!.rooms!.forEach((entry) => {
            this.rooms[entry.name] = new Room(entry.name, entry.path, this);
        });
    }

    /**
     * Load all items from the asset index
     */
    private loadItems() {
        this.index!.items!.forEach((item) => {
            this.items[item.name] = new Item(item.name, item.path, this);
        });
    }

    /**
     * Load all notes from the asset index
     */
    private loadNotes() {
        this.index!.notes!.forEach((note) => {
            this.notes[note.name] = new Note(note.name, note.path, this);
        });
    }

    /**
     * Wait for all assets to load
     * @returns A promise that resolves when all assets have loaded
     */
    private async waitForAssets() {
        while (true) {
            const allTexturesLoaded = Object.values(this.textures).every(texture => texture.hasLoaded());
            const allRoomsLoaded = Object.values(this.rooms).every(room => room.hasLoaded());
            const allItemsLoaded = Object.values(this.items).every(item => item.hasLoaded());
            const allNotesLoaded = Object.values(this.notes).every(note => note.hasLoaded());

            if (allTexturesLoaded && allRoomsLoaded && allItemsLoaded && allNotesLoaded && this.config) {
                return;
            }
    
            // wait for 50 milliseconds before checking again
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }

    public getRoom(name: string): Room {
        return this.rooms[name];
    }

    public getRooms(): { [name: string]: Room } {
        return this.rooms;
    }

    public getTexture(name: string): Texture {
        return this.textures[name];
    }

    public getTextures(): { [name: string]: Texture } {
        return this.textures;
    }

    public getItem(name: string): Item {
        return this.items[name];
    }

    public getItems(): { [name: string]: Item } {
        return this.items;
    }

    public getNote(name: string): Note {
        return this.notes[name];
    }

    public getNotes(): { [name: string]: Note } {
        return this.notes;
    }

    public getObjectByName(name: string): GameObject | undefined {
        for (const room of Object.values(this.rooms)) {
            const object = room.getObjectByName(name);
            if (object) {
                return object;
            }
        }
    }

    public logAction(action: string) {
        this.actionLog.push(action);
        this.rerender();
    }

    public getActionLog(): string[] {
        return this.actionLog;
    }

    public addToInventory(item: Item) {
        this.inventory.push(item);
    }

    public getInventory(): Item[] {
        return this.inventory;
    }

    public getSelectedInventorySlot(): number {
        return this.selectedInventorySlot;
    }

    public setSelectedInventorySlot(slot: number) {
        this.selectedInventorySlot = slot;
        this.rerender();
    }

    public removeFromInventory(item: Item) {
        let index = this.inventory.indexOf(item);
        if (index > -1) {
            this.inventory.splice(index, 1);
        }
    }

    public getCurrentRoom(): Room {
        if (!this.room) {
            throw new Error("❌🎮 No room set");
        }
        return this.room;
    }

    public rerender() {
        this.renderer!.changeScene(this);
    }

    public getVariableHandler(): VariableHandler {
        return this.variableHandler;
    }

}