export default class {

    name = undefined;

    level = 0;

    intents  = [];
    partials = [];

    execute = undefined;

    constructor (data) {

        this.name = data.name;

        this.level    = data.level    ?? this.level;
        this.intents  = data.intents  ?? this.intents;
        this.partials = data.partials ?? this.partials;

        this.execute = data.execute;
    };
};
