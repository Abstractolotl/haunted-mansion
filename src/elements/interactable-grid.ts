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

    public addInteraction(x: number, interaction: Function) {
        this.columns[x].classList.add('interactable');
        this.columns[x].addEventListener('click', () => {
            interaction();
        });
    }

    public clear() {
        super.clear();
        for (let column of this.columns) {
            column.classList.remove('interactable');
            column.removeEventListener('click', () => {});
        }
    }
}