import { Condition } from "./types";

// TODO: Implement logic for each condition
// TODO: Implement rest of the conditions

class SelectedItemCondition implements Condition {
    type: "selected_item" = "selected_item";
    options: {
        itemName: string;
    };

    constructor(options: { itemName: string }) {
        this.options = options;
    }

    check(): boolean {
        // Implement the logic to check if the item is selected
        console.log(`Checking if item is selected: ${this.options.itemName}`);
        return true; // Placeholder
    }
}

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
        default:
            throw new Error(`Unknown condition type: ${condition.type}`);
    }
}
