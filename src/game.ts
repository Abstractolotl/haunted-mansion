import { Item } from "./elements/objects/item";
import { Note } from "./elements/objects/note";
import { Room } from "./elements/objects/room";
import { Texture } from "./elements/objects/texture";
import { AssetIndex, GameConfig } from "./types";

export class Game {
    private index?: AssetIndex;
    private config?: GameConfig;

    // assets
    private rooms: Room[] = [];
    private items: Item[] = [];
    private notes: Note[] = [];
    private textures: Texture[] = [];

    constructor(configPath: string) {
        console.log("🎮 Game created");

        this.loadAssets(configPath);
        // TODO: Start game
    }

    /**
     * Load all assets for the game
     * @param configPath The path to the game config
     * @returns A promise that resolves when all assets have been loaded
     * @throws An error if any asset could not be loaded
     */
    private async loadAssets(configPath: string) {
        await this.loadGameConfig(configPath);
        await this.loadAssetIndex(this.config!.indexPath);

        // Load all assets
        this.loadTextures();
        this.loadRooms();
        this.loadItems();
        this.loadNotes();

        await this.waitForAssets();
        console.log("🎮 Game assets loaded");

        // call all actions in all interactions in all objects in rooms
        // for testing, // TODO: remove
        /*for (let room of this.rooms) {
            for (let object of room.getObjects()) {
                object.getInteractions().forEach((interaction) => {
                    interaction.executeActions();
                });
            }
        }*/
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
     * @param indexPath The path to the asset index
     * @returns A promise that resolves when the asset index has been loaded
     * @throws An error if the asset index could not be loaded
     */
    private async loadAssetIndex(indexPath: string) {
        console.log("📚 Loading asset index");
        this.index = await fetch(indexPath).then(response => response.json());
        if (!this.index) {
            throw new Error("❌📚 Asset index could not be loaded, exiting...");
        }
        console.log("✔️📚 Asset index loaded");
    }

    /**
     * Load all textures from the asset index
     */
    private loadTextures() {
        this.index!.textures!.forEach((entry) => {
            this.textures.push(new Texture(entry.name, entry.path));
        });
    }

    /**
     * Load all rooms from the asset index
     */
    private loadRooms() {
        this.index!.rooms!.forEach((entry) => {
            this.rooms.push(new Room(entry.name, entry.path));
        });
    }

    /**
     * Load all items from the asset index
     */
    private loadItems() {
        this.index!.items!.forEach((entry) => {
            this.items.push(new Item(entry.name, entry.path));
        });
    }

    /**
     * Load all notes from the asset index
     */
    private loadNotes() {
        this.index!.notes!.forEach((entry) => {
            this.notes.push(new Note(entry.name, entry.path));
        });
    }

    /**
     * Wait for all assets to load
     * @returns A promise that resolves when all assets have loaded
     */
    private async waitForAssets() {
        while (true) {
            const allTexturesLoaded = this.textures.every(texture => texture.hasLoaded());
            const allRoomsLoaded = this.rooms.every(room => room.hasLoaded());
            const allItemsLoaded = this.items.every(item => item.hasLoaded());
            const allNotesLoaded = this.notes.every(note => note.hasLoaded());

            if (allTexturesLoaded && allRoomsLoaded && allItemsLoaded && allNotesLoaded) {
                return;
            }
    
            // wait for 50 milliseconds before checking again
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
}