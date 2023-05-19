export default class {

    name     = undefined;
    level    = undefined;
    intents  = undefined;
    partials = undefined;
    execute  = undefined;

    constructor (options) {

        this.name    = options.name;
        this.execute = options.execute;

        this.level = options.level ?? 0;

        this.intents  = options.intents  ?? [];
        this.partials = options.partials ?? [];

        if (this.level    !== 'number') throw new Error('Invalid level property');
        if (this.intents  !== 'object') throw new Error('Invalid intents property');
        if (this.partials !== 'object') throw new Error('Invalid partials property');
    };
};
