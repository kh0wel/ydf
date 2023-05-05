export default class {

    name = undefined;

    priority = 0;

    intents = [];

    partials = [];

    events = undefined;

    constructor (options) {

        this.name   = options.name;
        this.events = options.events;

        // Opciones del servicio
        if (options?.priority && typeof options.priority !== 'number') throw new Error('Invalid priority property');
        if (options?.intents  && typeof options.intents  !== 'object') throw new Error('Invalid intents property');
        if (options?.partials && typeof options.partials !== 'object') throw new Error('Invalid partials property');

        this.priority = options.priority ?? this.priority;
        this.intents  = options.intents  ?? this.intents;
        this.partials = options.partials ?? this.partials;
    };
};
