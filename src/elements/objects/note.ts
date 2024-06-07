export type NoteBlueprint = {
    name: string;
    displayName: string;
    text: string;
}

// follows the same pattern as Item, Texture, Room, and GameObject
export class Note {
    private name: string;
    private path: string;
    private displayName: string;
    private text: string;
    private loaded: boolean = false;

    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
        this.displayName = name;
        this.text = "";

        // start loading the note asynchonously
        this.loadNote();
    }

    /**
     * Load the note from the server
     * @returns A promise that resolves when the note has been loaded
     * @throws An error if the note could not be loaded
     */
    private async loadNote(): Promise<void> {
        console.log(`📝 Loading note: ${this.name}`);
        
        let path = "config/" + this.path;
        let response = await fetch(path);
        if (!response.ok) {
            throw new Error(`❌📝 Failed to load Note from ${path}: ${response.statusText}`);
        }
        let note: NoteBlueprint = await response.json();

        this.displayName = note.displayName;
        this.text = note.text;

        console.log(`✔️📝 Note loaded: ${this.name}`);
        this.loaded = true;
    }

    /**
     * Check if the Note has loaded
     * @returns True if the Note has loaded
     */
    public hasLoaded(): boolean {
        return this.loaded;
    }

    /**
     * Check if the Note has loaded
     * @throws An error if the Note has not loaded yet
     */
    public requireLoaded(): void {
        if (!this.loaded) throw new Error(`❌📝 Note ${this.name} has not loaded yet`);
    }

    /**
     * Get the text of the Note
     * @returns The text of the Note
     * @throws An error if the Note has not loaded yet
     */
    public getText(): string {
        this.requireLoaded();
        return this.text;
    }

    /**
     * Get the display name of the Note
     * @returns The display name of the Note
     */
    public getDisplayName(): string {
        return this.displayName;
    }

    /**
     * Get the JSON representation of the Note
     * @returns The JSON representation of the Note
     * @throws An error if the Note has not loaded yet
     */
    public toJSON(): NoteBlueprint {
        this.requireLoaded();
        return {
            name: this.name,
            displayName: this.displayName,
            text: this.text
        };
    }
}