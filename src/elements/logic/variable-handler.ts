export class VariableHandler {
    private variables: { [key: string]: any };

    constructor(variables?: { [key: string]: any }) {
        this.variables = variables || {};
    }

    public setVariable(name: string, value: any) {
        this.variables[name] = value;
        console.log(`Setting variable ${name} to ${value}`);
        console.log(`Variable ${name} is now ${this.variables[name]}`);
    }

    public incrementVariable(name: string, value: number) {
        if (!this.variables[name]) this.variables[name] = 0;
        this.variables[name] += value;
        console.log(`Incrementing variable ${name} by ${value}`);
        console.log(`Variable ${name} is now ${this.variables[name]}`);
    }

    public decrementVariable(name: string, value: number) {
        if (!this.variables[name]) this.variables[name] = 0;
        this.variables[name] -= value;
        console.log(`Decrementing variable ${name} by ${value}`);
        console.log(`Variable ${name} is now ${this.variables[name]}`);
    }

    public getVariable(name: string): any {
        return this.variables[name];
    }

    public getVariables(): { [key: string]: any } {
        return this.variables;
    }

    public getVariableNames(): string[] {
        return Object.keys(this.variables);
    }

    public resetVariables() {
        this.variables = {};
    }
}