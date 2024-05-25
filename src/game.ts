import { Item } from "./Item";
import { Room } from "./Room";
import { Texture } from "./Texture";
import { AssetIndex, GameConfig, Note } from "./types";

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
        /*let objects: { [key: string]: number } = {};
        objects["a"] = 1;
        objects["b"] = 2;
        objects["c"] = 3;
        console.log(objects);
        console.log(Object.values(objects));*/
        
    }

    private async loadAssets(configPath: string) {
        await this.loadGameConfig(configPath);
        await this.loadAssetIndex(this.config!.indexPath);

        // Load all assets
        this.loadTextures();
        this.loadRooms();
        this.loadItems();
        
        // TODO: Load items and notes

        await this.waitForAssets();

        console.log("🎮 Game assets loaded");

        // call all actions in all interactions in all objects in rooms
        // for testing, // TODO: remove
        for (let room of this.rooms) {
            for (let object of room.getObjects()) {
                object.getInteractions().forEach((interaction) => {
                    interaction.executeActions();
                });
            }
        }
    }

    private async loadGameConfig(configPath: string) {
        console.log("🔧 Loading game config");
        this.config = await fetch(configPath).then(response => response.json());
        if (!this.config) {
            throw new Error("❌ Game config could not be loaded, exiting...");
        }
        console.log("✔️🔧 Game config loaded");
    }

    private async loadAssetIndex(indexPath: string) {
        console.log("📚 Loading asset index");
        this.index = await fetch(indexPath).then(response => response.json());
        console.log("✔️📚 Asset index loaded");
    }

    private loadTextures() {
        this.index!.textures!.forEach((entry) => {
            this.textures.push(new Texture(entry.name, entry.path));
        });
    }

    private loadRooms() {
        this.index!.rooms!.forEach((entry) => {
            this.rooms.push(new Room(entry.name, entry.path));
        });
    }

    private loadItems() {
        this.index!.items!.forEach((entry) => {
            this.items.push(new Item(entry.name, entry.path));
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

            if (allTexturesLoaded && allRoomsLoaded) {
                return;
            }
    
            // wait for 50 milliseconds before checking again
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
}