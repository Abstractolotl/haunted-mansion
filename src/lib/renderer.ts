import {ConfigHelper} from "@/lib/config-helper";
import Background from "@/elements/background";
import {Scale} from "@/lib/scale";
import {Room} from "@/elements/objects/room";
import {Grid} from "@/elements/grid";
import {Texture} from "@/elements/objects/texture";
import {InteractableGrid} from "@/elements/interactable-grid";
import {Item} from "@/elements/objects/item";
import {Note} from "@/elements/objects/note";
import {Game} from "@/game";
import ActionLog from "@/elements/action-log";

export class Renderer {

    private readonly GAME_OFFSET_X;
    private readonly GAME_OFFSET_Y;

    private scale: Scale;
    private background: Background;

    private readonly roomGrid: Grid;
    private readonly objectGrid: InteractableGrid;
    private readonly actionLog: ActionLog;

    private readonly config: ConfigHelper;
    private readonly textures: { [name: string]: Texture } = {};

    private currentRoom?: Room;

    constructor(config: ConfigHelper, textures: { [name: string]: Texture }) {
        let gameParent = document.getElementById("game")
        if (!gameParent) throw new Error("❌🎮 Game parent not found");

        this.textures = textures;
        this.config = config;

        this.GAME_OFFSET_X = config.getPadding();
        this.GAME_OFFSET_Y = config.getSceneBorder()[1] + config.getPadding();

        this.scale = new Scale();
        this.background = new Background(this.scale.getGridConfig(), config, gameParent);

        this.roomGrid = new Grid(this.scale.getGridConfig());
        this.objectGrid = new InteractableGrid(this.scale.getGridConfig(), 'objects');

        gameParent.append(this.roomGrid.getElement());
        gameParent.append(this.objectGrid.getElement());

        this.scale.addGrid(this.background.getGrid());
        this.scale.addGrid(this.roomGrid);
        this.scale.addGrid(this.objectGrid);

        this.actionLog = new ActionLog(this.scale.getGridConfig(), config, gameParent);
        this.scale.setActionLog(this.actionLog);

        this.scale.applySize();
    }

    private getTexture(name: string): Texture {
        let texture = this.textures[name];
        if (!texture) throw new Error(`❌🎮 Texture ${name} not found`);
        return texture;
    }

    public changeScene(game: Game) {
        if (this.currentRoom && this.currentRoom?.getDisplayName() === game.getCurrentRoom().getDisplayName()) {
            this.updateRoom(game);
            return;
        } else if(this.currentRoom) {
            console.log("🎮 Changing scene to: " + game.getCurrentRoom().getDisplayName())
        }

        let room = game.getCurrentRoom()

        this.roomGrid.clear()
        this.objectGrid.clear()

        let backgroundTexture = this.getTexture(room.getBackground());
        backgroundTexture.getContent().split("\n").reverse().forEach((line, y) => {
            line.split("").forEach((char, x) => {
                this.roomGrid.draw(char, this.GAME_OFFSET_X + x, this.GAME_OFFSET_Y + y)
            });
        });

        room.getObjects().forEach((object) => {
            if(object.hidden) return;

            let objectTexture = this.getTexture(object.texture);
            objectTexture.getContent().split("\n").reverse().forEach((line, y) => {
                line.split("").forEach((char, x) => {
                    let posX = this.GAME_OFFSET_X + object.posX + x
                    let posY = this.GAME_OFFSET_Y + object.posY + y

                    this.objectGrid.draw(char, posX, posY)
                    if (object.interactions.length > 0) {
                        this.objectGrid.addInteraction(posX, posY, object.executeInteractions.bind(object))
                    }
                });
            });
        });

        this.renderInventory(game);
        this.currentRoom = room
    }

    private updateRoom(game: Game) {
        if (!this.currentRoom) return;

        let room = game.getCurrentRoom()
        room.getObjects().filter((object) => object.hidden).forEach((object) => {
            let objectTexture = this.getTexture(object.texture);
            objectTexture.getContent().split("\n").reverse().forEach((line, y) => {
                line.split("").forEach((char, x) => {
                    let posX = this.GAME_OFFSET_X + object.posX + x
                    let posY = this.GAME_OFFSET_Y + object.posY + y

                    this.objectGrid.clearPosition(posX, posY)
                });
            });
        });

        room.getObjects().filter((object) => !object.hidden).forEach((object) => {
            let objectTexture = this.getTexture(object.texture);
            objectTexture.getContent().split("\n").reverse().forEach((line, y) => {
                line.split("").forEach((char, x) => {
                    let posX = this.GAME_OFFSET_X + object.posX + x
                    let posY = this.GAME_OFFSET_Y + object.posY + y

                    this.objectGrid.draw(char, posX, posY)
                    if (object.interactions.length > 0) {
                        this.objectGrid.addInteraction(posX, posY, object.executeInteractions.bind(object))
                    }
                });
            });
        })

        this.renderInventory(game);
        this.currentRoom = room
    }

    private renderInventory(game: Game) {
        this.background.drawInventoryBorder(game.getSelectedInventorySlot());
        if (game.getInventory().length === 0) return;

        let maxX = this.config.getSceneBorder()[0] - 2;
        let start = {x: 2, y: 1}

        for(let x = start.x; x < maxX; x++) {
            for (let y = start.y; y < this.config.getInventorySize().rows * (this.config.getInventorySize().slotSize[1] + 1); y++) {
                this.objectGrid.clearPosition(x, y)
            }
        }

        let columns = Math.floor((maxX - start.x) / (this.config.getInventorySize().slotSize[0] + 1))
        for (let i = 0; i < game.getInventory().length; i++) {
            let item = game.getInventory()[i];
            let itemTexture = this.getTexture(item.texture);
            itemTexture.getContent().split("\n").reverse().forEach((line, y) => {
                line.split("").forEach((char, x) => {
                    let posX = (start.x + 1) + (i % columns) * (this.config.getInventorySize().slotSize[0] + 1) + x;
                    let posY = (start.y + 1 )+ Math.floor(i / columns) * (this.config.getInventorySize().slotSize[1] + 1) + y;

                    this.objectGrid.draw(char, posX, posY)
                    this.objectGrid.addInteraction(posX, posY, () => {
                        game.setSelectedInventorySlot(i);
                    });
                });
            });
        }
    }

}