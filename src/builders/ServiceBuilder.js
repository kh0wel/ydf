export default class {

    name = undefined;

    intents  = [];
    partials = [];

    events = undefined;

    constructor (data) {

        this.name = data.name;

        this.intents  = data.intents  ?? this.intents;
        this.partials = data.partials ?? this.partials;

        this.events = data.events;
    };
};
