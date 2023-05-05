import deleteProperty from '../utilities/deleteProperty.js';

export default class {

    name = undefined;

    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
    type = 1;

    priority = 0;

    intents = [];

    partials = [];

    display = {
        
        name:        { default: undefined },
        description: { default: undefined },

        options: [],

        permissions: {

            member: null,

            dm: false, nsfw: false 
        },

        data: {

            name: undefined, description: undefined,

            name_localizations: {}, description_localizations: {},

            options: [],

            dm_permission: false, nsfw: false,

            default_member_permissions: null
        }
    };

    events = undefined;

    constructor (options) {
        
        this.name   = options.name;
        this.events = options.events;

        if (options?.priority && typeof options.priority !== 'number') throw new Error('Invalid priority property');
        if (options?.intents  && typeof options.intents  !== 'object') throw new Error('Invalid intents property');
        if (options?.partials && typeof options.partials !== 'object') throw new Error('Invalid partials property');

        if (options?.display.name        && typeof options.display.name        !== 'object') throw new Error('Invalid display name property');
        if (options?.display.description && typeof options.display.description !== 'object') throw new Error('Invalid display description property');
        if (options?.display.options     && typeof options.display.options     !== 'object') throw new Error('Invalid display options property');
        
        if (options?.display.permissions.dm   && typeof options.display.permissions.dm   !== 'boolean') throw new Error('Invalid display permissions dm property');
        if (options?.display.permissions.nsfw && typeof options.display.permissions.nsfw !== 'boolean') throw new Error('Invalid display permissions nsfw property');

        if (

            options?.display.permissions.member &&

            typeof options.display.permissions.member !== 'number' &&
            typeof options.display.permissions.member !== 'bigint' &&
            typeof options.display.permissions.member !== 'object'
        )
            throw new Error('Invalid display permissions member property');

        // Opciones del comando
        this.priority = options.priority ?? this.priority;
        this.intents  = options.intents  ?? this.intents;
        this.partials = options.partials ?? this.partials;

        this.display.name        = options.display.name;
        this.display.description = options.display.description;

        this.display.options = options.display?.options ?? this.display.options;

        this.display.permissions.dm     = options.display.permissions?.dm     ?? this.display.permissions.dm;
        this.display.permissions.nsfw   = options.display.permissions?.nsfw   ?? this.display.permissions.nsfw;
        this.display.permissions.member = options.display.permissions?.member ?? this.display.permissions.member;

        // Datos del comando
        this.display.data.name        = this.display.name.default;
        this.display.data.description = this.display.description.default;

        this.display.data.name_localizations        = deleteProperty(this.display.name, 'default');
        this.display.data.description_localizations = deleteProperty(this.display.description, 'default');

        this.display.data.options = this.display.options;

        this.display.data.dm_permission              = this.display.permissions.dm;
        this.display.data.nsfw                       = this.display.permissions.nsfw;
        this.display.data.default_member_permissions = this.display.permissions.member;
    };
};
