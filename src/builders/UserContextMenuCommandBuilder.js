export default class {

    name = undefined;

    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
    type = 2;

    priority = 0;

    intents = [];

    partials = [];

    display = {
        
        name: { default: undefined },

        permissions: { dm: false, member: null }
    };

    events = undefined;

    constructor (options) {

        this.name = options.name;

        this.priority = options.priority ?? this.priority;
        this.intents  = options.intents  ?? this.intents;
        this.partials = options.partials ?? this.partials;

        this.display.name = options.display.name;

        this.display.permissions.dm     = options.display.permissions?.dm     ?? this.display.permissions.dm;
        this.display.permissions.member = options.display.permissions?.member ?? this.display.permissions.member;

        this.events = options.events;
    };
};
