export default class {

    name = undefined;

    intents  = [];
    partials = [];

    execute  = undefined;

    constructor (data) {

        this.name = data.name;

        this.intents  = data.intents  ?? this.intents;
        this.partials = data.partials ?? this.partials;

        this.execute = data.execute;
    };
};
