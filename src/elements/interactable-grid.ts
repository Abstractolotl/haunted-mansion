import {Grid, Row} from "@/elements/grid";

export class InteractableGrid extends Grid {

    protected createRows() {
        for (let i = 0; i < this.config.height; i++) {
            const row = new InteractableRow(this.config.width, this.config.size);
            this.element.appendChild(row.getElement());
            this.rows.push(row);
        }
        this.rows.reverse()
    }

    public addInteraction(x: number, y: number, interaction: Function) {
        (this.rows[y] as InteractableRow).addInteraction(x, interaction);
    }

}

export class InteractableRow extends Row {

    private interactionsTimeout: Function[] = [];
    private interactions: { [x: number]: Function[] } = {};

    public addInteraction(x: number, interaction: Function) {
        if (this.interactions[x] && this.interactions[x].length > 0) return;

        if (!this.interactions[x]) {
            this.interactions[x] = [];
        }

        if(!this.columns[x].classList.contains('interactable')) {
            this.columns[x].classList.add('interactable');
            this.columns[x].onclick = () => this.triggerInteraction(x);
        }

        if(this.interactions[x].includes(interaction)) {
            throw new Error('❌🔧 Interaction already exists');
        }

        this.interactions[x].push(interaction);
    }

    public clear() {
        super.clear();

        this.interactions = {};
        this.interactionsTimeout = [];

        for (let x = 0; x < this.columns.length; x++) {
            let column = this.columns[x];
            if (column.classList.contains('interactable')) {
                column.classList.remove('interactable');
                column.onclick = null;
            }
        }
    }

    clearPosition(x: number) {
        super.clearPosition(x);

        if (!this.interactions[x]) return;
        this.interactions[x] = [];

        let column = this.columns[x];
        if (column.classList.contains('interactable')) {
            column.classList.remove('interactable');
            column.onclick = null;
        }
    }

    public triggerInteraction(x: number) {
        if (!this.interactions[x]) return;

        for (let interaction of this.interactions[x]) {
            if (this.interactionsTimeout.includes(interaction)) {
                return;
            }
            this.interactionsTimeout.push(interaction);
            interaction();
        }

        // Block interactions for 500ms
        setTimeout(() => {
            if (!this.interactions[x]) return;
            this.interactions[x].forEach((interaction) => this.interactionsTimeout.filter((value) => value !== interaction));
        }, 1000);
    }
}