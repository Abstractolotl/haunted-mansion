import { Texture } from "./Texture";
import { AssetIndex, GameConfig, Item, Note, Room } from "./types";

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
    }

    private async loadAssets(configPath: string) {
        // Load game config
        console.log("🔧 Loading game config");
        this.config = await fetch(configPath).then(response => response.json());
        if (!this.config) {
            throw new Error("❌ Game config could not be loaded, exiting...");
        }
        console.log("✔️🔧 Game config loaded");

        // Load asset index
        let indexPath = this.config.indexPath;
        console.log("📚 Loading asset index");
        this.index = await fetch(indexPath).then(response => response.json());
        console.log("✔️📚 Asset index loaded");

        // Load all assets
        this.index!.textures!.forEach((entry) => {
            this.textures.push(new Texture(entry.name, entry.path));
        });

        await this.waitForAssets();
    }
    
    private async waitForAssets() {
        console.log("🕐 Waiting for assets to load");
        while (true) {
            for (let texture of this.textures) {
                if (!texture.hasLoaded()) {
                    continue;
                }
            }
            break;
        }
        console.log("✔️🕐 All assets loaded");
    }
}