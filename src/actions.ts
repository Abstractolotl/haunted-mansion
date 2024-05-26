import { Action } from "./types";


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

    trigger(): void {
        console.log(`Going to room: ${this.options.roomName}`); // TODO: Implement the logic to go to the room
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

    trigger(): void {
        console.log(`Hiding object with ID: ${this.options.id}`); // TODO: Implement the logic to hide the object
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

    trigger(): void {
        console.log(`Revealing object with ID: ${this.options.id}`); // TODO: Implement the logic to reveal the object
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

    trigger(): void {
        console.log(`Giving item with ID: ${this.options.id}`); // TODO: Implement the logic to give the item
    }
}

// class RemoveItemAction


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

    trigger(): void {
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

    trigger(): void {
        console.log(`Showing note: ${this.options.noteName}`); // TODO: Implement the logic to show the note
    }
}


//
//  VARIABLES
//  TODO: Implement the rest of the variable actions
//

// class SetVariableAction
// class IncrementVariableAction
// class DecrementVariableAction


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

    trigger(): void {
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

    trigger(): void {
        console.log(`Log: ${this.options.text}`); // TODO: Implement the logic to print the action log
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
        case "hideObject":
            return new HideObjectAction(action.options);
        case "revealObject":
            return new RevealObjectAction(action.options);
        case "printActionLog":
            return new PrintActionLogAction(action.options);
        case "playSound":
            return new PlaySoundAction(action.options);
        case "goToRoom":
            return new GoToRoomAction(action.options);
        case "giveItem":
            return new GiveItemAction(action.options);
        case "grantNote":
            return new GrantNoteAction(action.options);
        case "showNote":
            return new ShowNoteAction(action.options);
        default:
            throw new Error(`Invalid action type: ${action.type}`);
    }
}
