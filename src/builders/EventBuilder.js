export default class {

    name = undefined;

    level = 0;

    intents = 0;

    execute = undefined;

    constructor (data) {

        this.name = data.name;

        this.level   = data.level   ?? this.level;
        this.intents = data.intents ?? this.intents;

        this.execute = data.execute;
    };
};
