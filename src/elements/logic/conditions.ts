import { Game } from "@/game";
import { Condition } from "@/types";

//
// Logic
//
class OrCondition implements Condition {
    type: "or" = "or";
    conditions: Condition[];

    constructor(options: { conditions: Condition[] }) {
        this.conditions = options.conditions;
    }

    check(gameContext: Game): boolean {
        for (let condition of this.conditions) {
            if (condition.check(gameContext)) {
                return true;
            }
        }
        return false;
    }
}

class AndCondition implements Condition {
    type: "and" = "and";
    conditions: Condition[];

    constructor(options: { conditions: Condition[] }) {
        if (options.conditions.length === 0) {
            throw new Error("AndCondition must have at least one condition");
        }
        this.conditions = options.conditions;
    }

    check(gameContext: Game): boolean {
        for (let condition of this.conditions) {
            if (!condition.check(gameContext)) {
                return false;
            }
        }
        return true;
    }
}

class NotCondition implements Condition {
    type: "not" = "not";
    condition: Condition;

    constructor(options: { condition: Condition }) {
        this.condition = options.condition;
    }

    check(gameContext: Game): boolean {
        return !this.condition.check(gameContext);
    }
}

class XorCondition implements Condition {
    type: "xor" = "xor";
    conditions: Condition[];

    constructor(options: { conditions: Condition[] }) {
        this.conditions = options.conditions;
    }

    check(gameContext: Game): boolean {
        let count = 0;
        for (let condition of this.conditions) {
            if (condition.check(gameContext)) {
                count++;
            }
        }
        return count === 1;
    }
}


//
//  Inventory
//  TODO: Implement the rest of the inventory conditions
//

class SelectedItemCondition implements Condition {
    type: "selected_item" = "selected_item";
    options: {
        itemName: string;
    };

    constructor(options: { itemName: string }) {
        this.options = options;
    }

    check(gameContext: Game): boolean {
        return gameContext.getInventory()[gameContext.getSelectedInventorySlot()].name === this.options.itemName;
    }
}

// class HasItemCondition
class HasItemCondition implements Condition {
    type: "has_item" = "has_item";
    options: {
        itemName: string;
    };

    constructor(options: { itemName: string }) {
        this.options = options;
    }

    check(gameContext: Game): boolean {
        return gameContext.getInventory().filter(item => item.name === this.options.itemName).length > 0;
    }
}

//
//  Comparison
//  TODO: Implement the rest of the comparison conditions
//

// class EqualsCondition
// class NotEqualsCondition
// class GreaterThanCondition
// class LessThanCondition
// class GreaterThanOrEqualCondition
// class LessThanOrEqualCondition


/**
 * Create a condition from an condition blueprint
 * @param condition The condition blueprint
 * @returns The created condition of the corresponding type
 * @throws An error if the condition type is invalid
 */
export function createCondition(condition: Condition): Condition {
    switch (condition.type) {
        case "selected_item":
            return new SelectedItemCondition(condition.options);
        case "has_item":
            return new HasItemCondition(condition.options);
        default:
            throw new Error(`Unknown condition type: ${condition.type}`);
    }
}
