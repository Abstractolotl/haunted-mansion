import {ConfigHelper} from "@/lib/config-helper";
import {Grid} from "@/elements/grid";
import {GridConfig} from "@/types";
import {Scale} from "@/lib/scale";

export default class ActionLog {

    private parent: HTMLElement;

    private size: number;
    private left: number;

    private width: number;
    private height: number;

    private margin: number;

    private container?: HTMLElement;

    constructor(gridConfig: GridConfig, config: ConfigHelper, parent: HTMLElement) {
        this.parent = parent;
        this.size = config.getActionLogSize();

        this.width = config.getActionLogSize() * (gridConfig.size / 2);
        this.height = gridConfig.size * (gridConfig.height - 2);
        this.margin = gridConfig.size
        this.left = config.getSceneBorder()[0];

        console.log(`📜 Action log size: ${this.size}`)
        console.log(`📜 Action log width: ${this.width}`)
        console.log(`📜 Action log height: ${this.height}`)
        console.log(`📜 Action log margin: ${this.margin}`)
        console.log(`📜 Action log left: ${this.left * this.margin / 2}`)

        this.drawContainer();
    }

    private drawContainer() {
        this.container = document.createElement('div');
        this.container.classList.add('action-log');
        this.container.style.width = `${this.width}px`;
        this.container.style.height = `${this.height}px`;
        this.container.style.left = `${this.left * (this.margin / 2) + this.margin}px`;
        this.parent.appendChild(this.container);
    }

    public resize(gridConfig: GridConfig) {
        this.width = this.size * (gridConfig.size / 2);
        this.height = gridConfig.size * (gridConfig.height - 2);
        this.margin = gridConfig.size
        console.log(`📜 Action log left: ${this.left * (this.margin / 2)}`)
        if (this.container) {
            this.container.style.width = `${this.width}px`;
            this.container.style.height = `${this.height}px`;
            this.container.style.left = `${(this.left * this.margin / 2) + this.margin}px`;
        }
    }

    public print(text: string) {
        console.log(`📜 ${text}`)
    }
}