import { Game } from "@/game";
import { Interaction, InteractionBlueprint } from "../logic/interaction";


export type GameObjectBlueprint = {
    name: string;
    posX: number;
    posY: number;
    texture: string;
    hidden?: boolean;
    interactions?: InteractionBlueprint[];
}

export class GameObject {
    name: string;
    posX: number;
    posY: number;
    texture: string;
    hidden: boolean;
    interactions: Interaction[] = [];
    gameContext: Game;

    constructor(blueprint: GameObjectBlueprint, gameContext: Game) {
        this.gameContext = gameContext;
        this.name = blueprint.name;
        this.posX = blueprint.posX;
        this.posY = blueprint.posY;
        this.texture = blueprint.texture;
        this.hidden = blueprint.hidden || false;
        for (let interaction of blueprint.interactions || []) { 
            this.interactions.push(new Interaction(interaction));
        }
    }

    /**
     * Get the interactions of the GameObject
     * @returns The interactions of the GameObject
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
            if (interaction.checkConditions(this.gameContext)) {
                passedInteractions.push(interaction);
            }
        }

        for (let interaction of passedInteractions) {
            interaction.executeActions(this.gameContext);
        }
    }

    /**
     * Check if the GameObject is hidden
     * @returns True if the GameObject is hidden
     */
    public isHidden(): boolean {
        return this.hidden;
    }

    /**
     * Serialize the GameObject to a JSON object
     * @returns The JSON representation of the GameObject
     */
    public toJSON(): GameObjectBlueprint {
        return {
            name: this.name,
            posX: this.posX,
            posY: this.posY,
            texture: this.texture,
            hidden: this.hidden,
            interactions: this.interactions.map(interaction => interaction.toJSON())
        };
    }
}