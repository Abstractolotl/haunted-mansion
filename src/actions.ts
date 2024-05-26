import { Action } from "./types";

// TODO: Implement logic for each action
// TODO: Implement rest of the actions

class HideObjectAction implements Action {
    type: "hideObject" = "hideObject";
    options: {
        id: string;
    };

    constructor(options: { id: string }) {
        this.options = options;
    }

    trigger(): void {
        console.log(`Hiding object with ID: ${this.options.id}`);
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
        console.log(`Revealing object with ID: ${this.options.id}`);
    }
}

class PrintActionLogAction implements Action {
    type: "printActionLog" = "printActionLog";
    options: {
        text: string;
    };

    constructor(options: { text: string }) {
        this.options = options;
    }

    trigger(): void {
        console.log(`Log: ${this.options.text}`);
    }
}

class PlaySoundAction implements Action {
    type: "playSound" = "playSound";
    options: {
        id: string;
    };

    constructor(options: { id: string }) {
        this.options = options;
    }

    trigger(): void {
        console.log(`Playing sound with ID: ${this.options.id}`);
    }
}

class GoToRoomAction implements Action {
    type: "goToRoom" = "goToRoom";
    options: {
        roomName: string;
    };

    constructor(options: { roomName: string }) {
        this.options = options;
    }

    trigger(): void {
        console.log(`Going to room: ${this.options.roomName}`);
    }
}

class GiveItemAction implements Action {
    type: "giveItem" = "giveItem";
    options: {
        id: string;
    };

    constructor(options: { id: string }) {
        this.options = options;
    }

    trigger(): void {
        console.log(`Giving item with ID: ${this.options.id}`);
    }
}

class GrantNoteAction implements Action {
    type: "grantNote" = "grantNote";
    options: {
        noteName: string;
    };

    constructor(options: { noteName: string }) {
        this.options = options;
    }

    trigger(): void {
        console.log(`Granting note: ${this.options.noteName}`);
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
        console.log(`Showing note: ${this.options.noteName}`);
    }
}

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
