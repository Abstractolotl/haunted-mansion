import { Interaction, InteractionBlueprint } from "./Interaction";

// same as Texture.ts:
export type ItemBlueprint = {
    name: string;
    displayName: string;
    texture: string;
    interactions?: InteractionBlueprint[];
}

export class Item {
    name: string;
    path: string;
    displayName: string;
    texture: string = "";
    interactions: Interaction[] = [];
    loaded: boolean = false;

    constructor(name: string, path: string) {
        this.name = name;
        this.displayName = name;
        this.path = path;

        // start loading the item asynchonously
        this.loadItem();
    }

    private async loadItem(): Promise<void> {
        console.log(`📦 Loading item: ${this.name}`);
        
        let path = "config/" + this.path;
        let response = await fetch(path);
        if (!response.ok) {
            throw new Error(`❌📦 Failed to load Item from ${path}: ${response.statusText}`);
        }
        let item: ItemBlueprint = await response.json();

        this.displayName = item.displayName;
        this.texture = item.texture;

        for (let interaction of item.interactions || []) {
            this.interactions.push(new Interaction(interaction));
        }

        console.log(`✔️📦 Item loaded: ${this.name}`);
        this.loaded = true;
    }

    /**
     * Get the interactions of the Item
     * @returns The interactions of the Item
     */
    public getInteractions(): Interaction[] {
        return this.interactions;
    }

    /**
     * Execute all actions of all interactions that passed their conditions
     */
    public executeInteractions(): void {
        let passedInteractions: Interaction[] = [];

        for (let interaction of this.interactions) {
            if (interaction.checkConditions()) {
                passedInteractions.push(interaction);
            }
        }

        for (let interaction of passedInteractions) {
            interaction.executeActions();
        }
    }

    /**
     * Serialize the Item to a JSON object
     * @returns The JSON representation of the Item
     */
    public toJSON(): ItemBlueprint {
        return {
            name: this.name,
            displayName: this.displayName,
            texture: this.texture,
            interactions: this.interactions.map(interaction => interaction.toJSON())
        };
    }

    public toString(): string {
        return this.displayName;
    }
}