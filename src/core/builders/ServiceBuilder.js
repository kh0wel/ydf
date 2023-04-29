export default class {

    name = undefined;

    priority = 0;

    intents = [];

    partials = [];

    events = undefined;

    constructor (options) {

        this.name = options.name;

        this.priority = options.priority ?? this.priority;
        this.intents  = options.intents  ?? this.intents;
        this.partials = options.partials ?? this.partials;

        this.events = options.events;
    };
};
