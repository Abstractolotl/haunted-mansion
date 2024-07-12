import { Game } from "@/game";
import { createAction } from "./actions";
import { createCondition } from "./conditions";
import { Action, Condition } from "@/types";

export type InteractionBlueprint = {
    conditions: Condition[];
    actions: Action[];
}

export class Interaction {
    private conditions: Condition[] = [];
    private actions: Action[] = [];

    constructor(blueprint: InteractionBlueprint) {
        for (let condition of blueprint.conditions) {
            this.conditions.push(createCondition(condition));
        }
        for (let action of blueprint.actions) {
            this.actions.push(createAction(action));
        }
    }

    public getConditions(): Condition[] {
        return this.conditions;
    }

    public getActions(): Action[] {
        return this.actions;
    }

    public checkConditions(gameContext: Game): boolean {
        for (let condition of this.conditions) {
            if (!condition.check(gameContext)) {
                return false;
            }
        }
        return true;
    }

    public executeActions(gameContext: Game) {
        for (let action of this.actions) {
            action.trigger(gameContext);
        }
    }

    public toJSON(): InteractionBlueprint {
        return {
            conditions: this.conditions,
            actions: this.actions
        };
    }
    
}