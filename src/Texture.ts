export class Texture {
    private name: string;
    private path: string;
    private content: string = "";
    private loaded: boolean = false;

    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;

        // start loading the texture asynchonously
        this.loadTexture();
    }
    
    // load with callback
    async loadTexture(): Promise<void> {
        console.log(`🖼️ Loading texture: ${this.name}`);
        
        let path = "assets/" + this.path;
        let response = await fetch(path);
        if (!response.ok) {
            throw new Error(`❌ Failed to load texture: ${response.statusText} from ${path}`);
        }
        this.content = await response.text();
        // console.log(`✔️🖼️ Texture loaded: ${this.name}\n${this.content}`);
        console.log(`✔️🖼️ Texture loaded: ${this.name}`);
        this.loaded = true;
    }

    public hasLoaded(): boolean {
        return this.loaded;
    }

    public getContent(): string {
        if (!this.loaded) throw new Error(`Texture ${this.name} has not loaded yet`);
        return this.content;
    }
}