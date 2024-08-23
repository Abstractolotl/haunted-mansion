import { Game } from "@/game";
import { Action, ConfigurationError } from "@/types";

//
//  ROOMS
//  TODO: Implement the rest of the room actions
//
class GoToRoomAction implements Action {
    type: "goToRoom" = "goToRoom";
    options: {
        roomName: string;
        suppressMessage?: boolean; // TODO: Send action log message
    };

    constructor(options: { roomName: string, suppressMessage?: boolean }) {
        this.options = options;
    }

    trigger(game: Game): void {
        console.log(`Going to room: ${this.options.roomName}`); // TODO: Implement the logic to go to the room
        game.goToRoom(this.options.roomName);
    }
}

// class ResetRoomAction - evaluate if needed


//
//  OBJECTS
//  TODO: Implement the rest of the object actions
//

class HideObjectAction implements Action {
    type: "hideObject" = "hideObject";
    options: {
        id: string;
    };

    constructor(options: { id: string }) {
        this.options = options;
    }

    trigger(gameContext: Game): void {
        const object = gameContext.getObjectByName(this.options.id);
        if (!object) return;
        
        object.hidden = true;
        gameContext.rerender()
    }
}

class RevealObjectAction implements Action {
    type: "revealObject" = "revealObject";
    options: {
        id: string;
    };

    constructor(options: { id: string }) {
        this.options = options;
    }

    trigger(gameContext: Game): void {
        const object = gameContext.getObjectByName(this.options.id);
        if (!object) return;

        object.hidden = false;
        gameContext.rerender()
    }
}

class ClickObjectAction implements Action {
    type: "clickObject" = "clickObject";
    options: {
        id: string;
    };

    constructor(options: { id: string }) {
        this.options = options;
    }

    trigger(gameContext: Game): void {
        const object = gameContext.getObjectByName(this.options.id);
        if (!object) return;

        object.executeInteractions();
    }
}

// class MoveObjectAction
// class ShiftObjectAction


//
//  ITEMS
//  TODO: Implement the rest of the item actions
//

class GiveItemAction implements Action {
    type: "giveItem" = "giveItem";
    options: {
        id: string;
    };

    constructor(options: { id: string }) {
        this.options = options;
    }

    trigger(gameContext: Game): void {
        console.log(`Giving item with ID: ${this.options.id}`); // TODO: Implement the logic to give the item
        gameContext.addToInventory(gameContext.getItem(this.options.id));
        gameContext.rerender()
    }
}

// class RemoveItemAction

class RemoveItemAction implements Action {
    type: "giveItem" = "giveItem";
    options: {
        id: string;
    };

    constructor(options: { id: string }) {
        this.options = options;
    }

    trigger(gameContext: Game): void {
        console.log(`Removing item with ID: ${this.options.id}`); // TODO: Implement the logic to give the item
        gameContext.removeFromInventory(gameContext.getItem(this.options.id));
        gameContext.rerender()
    }
}
//
//  NOTES
//

class GrantNoteAction implements Action {
    type: "grantNote" = "grantNote";
    options: {
        noteName: string;
    };

    constructor(options: { noteName: string }) {
        this.options = options;
    }

    trigger(gameContext: Game): void {
        console.log(`Granting note: ${this.options.noteName}`); // TODO: Implement the logic to grant the note
    }
}

class ShowNoteAction implements Action {
    type: "showNote" = "showNote";
    options: {
        noteName: string;
    };

    constructor(options: { noteName: string }) {
        this.options = options;
    }

    trigger(gameContext: Game): void {
        console.log(`Showing note: ${this.options.noteName}`); // TODO: Implement the logic to show the note
        alert(gameContext.getNote(this.options.noteName).getText());
    }
}


//
//  VARIABLES
//  TODO: Implement the rest of the variable actions
//

class SetVariableAction implements Action {
    type: "setVariable" = "setVariable";
    options: {
        name: string;
        value: any;
    };

    constructor(options: { name: string, value: any }) {
        this.options = options;
    }

    trigger(gameContext: Game): void {
        if (!this.options.name) throw new ConfigurationError("Variable name must be defined for setVariable action");
        if (this.options.value === undefined) throw new ConfigurationError("Variable value must be defined for setVariable action");
        if (typeof this.options.value !== "number") throw new ConfigurationError("Variable value must be a number for setVariable action");

        gameContext.getVariableHandler().setVariable(this.options.name, this.options.value);
    }
}

class IncrementVariableAction implements Action {
    type: "incrementVariable" = "incrementVariable";
    options: {
        name: string;
        value: number;
    };

    constructor(options: { name: string, value: number }) {
        this.options = options;
    }

    trigger(gameContext: Game): void {
        if (!this.options.name) throw new ConfigurationError("Variable name must be defined for incrementVariable action");
        if (this.options.value === undefined) this.options.value = 1;
        if (typeof this.options.value !== "number") throw new ConfigurationError("Variable value must be a number for incrementVariable action");

        gameContext.getVariableHandler().incrementVariable(this.options.name, this.options.value);
    }
}

class DecrementVariableAction implements Action {
    type: "decrementVariable" = "decrementVariable";
    options: {
        name: string;
        value: number;
    };

    constructor(options: { name: string, value: number }) {
        this.options = options;
    }

    trigger(gameContext: Game): void {
        if (!this.options.name) throw new ConfigurationError("Variable name must be defined for decrementVariable action");
        if (this.options.value === undefined) this.options.value = 1;
        if (typeof this.options.value !== "number") throw new ConfigurationError("Variable value must be a number for decrementVariable action");

        gameContext.getVariableHandler().decrementVariable(this.options.name, this.options.value);
    }
}


//
//  SOUNDS
//

class PlaySoundAction implements Action {
    type: "playSound" = "playSound";
    options: {
        id: string;
    };

    constructor(options: { id: string }) {
        this.options = options;
    }

    trigger(gameContext: Game): void {
        console.log(`Playing sound with ID: ${this.options.id}`); // TODO: Implement the logic to play the sound
    }
}


//
//  MISC
//  TODO: Implement the rest of the misc actions
//

class PrintActionLogAction implements Action {
    type: "printActionLog" = "printActionLog";
    options: {
        text: string;
    };

    constructor(options: { text: string }) {
        this.options = options;
    }

    trigger(gameContext: Game): void {
        let date = new Date();
        let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        gameContext.logAction(`${time} » ${this.options.text}`);
        console.log(`Printing action log: ${this.options.text}`);
    }
}

// class callActionAction


/**
 * Create an action from an action blueprint
 * @param action The action blueprint
 * @returns The created action of the corresponding type
 * @throws An error if the action type is invalid
 */
export function createAction(action: Action): Action {
    switch (action.type) {
        case "goToRoom":
            return new GoToRoomAction(action.options);
        case "hideObject":
            return new HideObjectAction(action.options);
        case "revealObject":
            return new RevealObjectAction(action.options);
        case "clickObject":
            return new ClickObjectAction(action.options);
        case "giveItem":
            return new GiveItemAction(action.options);
        case "grantNote":
            return new GrantNoteAction(action.options);
        case "showNote":
            return new ShowNoteAction(action.options);
        case "setVariable":
            return new SetVariableAction(action.options);
        case "incrementVariable":
            return new IncrementVariableAction(action.options);
        case "decrementVariable":
            return new DecrementVariableAction(action.options);
        case "playSound":
            return new PlaySoundAction(action.options);
        case "printActionLog":
            return new PrintActionLogAction(action.options);
        
        default:
            throw new ConfigurationError(`Invalid action type: ${action.type}`);
    }
}
