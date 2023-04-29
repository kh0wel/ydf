export default class {

    name = undefined;

    priority = 0;

    intents = [];

    partials = [];

    execute = undefined;

    constructor (options) {

        this.name = options.name;

        this.priority = options.priority ?? this.priority;
        this.intents  = options.intents  ?? this.intents;
        this.partials = options.partials ?? this.partials;

        this.execute = options.execute;
    };
};
