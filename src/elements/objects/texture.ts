export class Texture {
    private name: string;
    private path: string;
    private content: string = "";
    private loaded: boolean = false;

    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;

        // start loading the texture asynchonously
        this.loadTexture()
            .then(r => r)
            .catch(e => console.error(e));
    }

    /**
     * Load the texture from the server
     * @returns A promise that resolves when the texture has been loaded
     * @throws An error if the texture could not be loaded
     */
    async loadTexture(): Promise<void> {
        console.log(`🖼️ Loading texture: ${this.name}`);
        
        let path = "assets/" + this.path;
        let response = await fetch(path);
        if (!response.ok) {
            throw new Error(`❌🖼️ Failed to load texture from ${path}: ${response.statusText}`);
        }
        this.content = await response.text();
        // console.log(`✔️🖼️ Texture loaded: ${this.name}\n${this.content}`);
        console.log(`✔️🖼️ Texture loaded: ${this.name}`);
        this.loaded = true;
    }

    /**
     * Check if the Texture has loaded
     * @returns True if the Texture has loaded
     */
    public hasLoaded(): boolean {
        return this.loaded;
    }

    /**
     * Check if the Texture has loaded
     * @throws An error if the Texture has not loaded yet
     */
    public requireLoaded(): void {
        if (!this.loaded) throw new Error(`❌🖼️ Texture ${this.name} has not loaded yet`);
    }

    public getContent(): string {
        this.requireLoaded();
        return this.content;
    }
}