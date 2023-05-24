export default class {

    name = undefined;

    intents  = [];
    partials = [];

    execute  = undefined;

    constructor (opt) {

        this.name = opt.name;

        this.intents  = opt.intents  ?? this.intents;
        this.partials = opt.partials ?? this.partials;

        this.execute = opt.execute;
    };
};
