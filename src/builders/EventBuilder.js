export default class {

    name = undefined;

    level = 0;

    intents  = [];
    partials = [];

    execute  = undefined;

    constructor (options) {

        this.name = options.name;

        this.level    = options.level    ?? this.level;
        this.intents  = options.intents  ?? this.intents;
        this.partials = options.partials ?? this.partials;

        this.execute = options.execute;
    };
};
