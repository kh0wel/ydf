export default class {

    name = undefined;

    intents  = [];
    partials = [];

    events = undefined;

    constructor (options) {

        this.name = options.name;

        this.intents  = options.intents  ?? this.intents;
        this.partials = options.partials ?? this.partials;

        this.events = options.events;
    };
};
