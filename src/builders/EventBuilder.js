export default class {

    name = undefined;

    priority = 0;

    intents = [];

    partials = [];

    execute = undefined;

    constructor (options) {

        this.name    = options.name;
        this.execute = options.execute;

        // Opciones del evento
        if (options?.priority && typeof options.priority !== 'number') throw new Error('Invalid priority property');
        if (options?.intents  && typeof options.intents  !== 'object') throw new Error('Invalid intents property');
        if (options?.partials && typeof options.partials !== 'object') throw new Error('Invalid partials property');

        this.priority = options.priority ?? this.priority;
        this.intents  = options.intents  ?? this.intents;
        this.partials = options.partials ?? this.partials;
    };
};
