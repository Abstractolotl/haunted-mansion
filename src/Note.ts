export type NoteBlueprint = {
    name: string;
    displayName: string;
    text: string;
}

// follows the same pattern as Item, Texture, Room, and GameObject
export class Note {
    name: string;
    path: string;
    displayName: string;
    text: string;
    loaded: boolean = false;

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
     * Get the text of the Note
     * @returns The text of the Note
     */
    public getText(): string {
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
     * Check if the Note has loaded
     * @returns True if the Note has loaded
     */
    public hasLoaded(): boolean {
        return this.loaded;
    }

    public toJSON(): NoteBlueprint {
        return {
            name: this.name,
            displayName: this.displayName,
            text: this.text
        };
    }
}