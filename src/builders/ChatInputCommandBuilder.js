import deleteProperty from '../utilities/deleteProperty.js';

export default class {

    name     = undefined;
    level    = undefined;
    intents  = undefined;
    partials = undefined;

    type = undefined;

    display = {
        
        name:        { default: undefined },
        description: { default: undefined },

        options: undefined,

        permissions: {

            member: undefined,
            dm:     undefined,
            nsfw:   undefined 
        },

        data: {

            name:                       undefined,
            description:                undefined,
            name_localizations:         undefined,
            description_localizations:  undefined,
            options:                    undefined,
            dm_permission:              undefined,
            nsfw:                       undefined,
            default_member_permissions: undefined
        }
    };

    events = undefined;

    constructor (options) {

        // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
        this.type = 1;

        this.name   = options.name;
        this.events = options.events;

        this.level = options.level ?? 0;

        this.intents  = options.intents  ?? [];
        this.partials = options.partials ?? [];

        this.display.name        = options.display.name;
        this.display.description = options.display.description;

        this.display.options = options.display?.options ?? [];

        this.display.permissions.dm   = options.display.permissions?.dm   ?? false
        this.display.permissions.nsfw = options.display.permissions?.nsfw ?? false;

        this.display.permissions.member = options.display.permissions?.member ?? null;

        if (this.level                    !== 'number')  throw new Error('Invalid level property');
        if (this.intents                  !== 'number')  throw new Error('Invalid intents property');
        if (this.partials                 !== 'number')  throw new Error('Invalid partials property');
        if (this.display.name             !== 'object')  throw new Error('Invalid display.name property');
        if (this.display.description      !== 'object')  throw new Error('Invalid display.description property');
        if (this.display.options          !== 'object')  throw new Error('Invalid display.ptions property');
        if (this.display.permissions.dm   !== 'boolean') throw new Error('Invalid display.permissions.dm property');
        if (this.display.permissions.nsfw !== 'boolean') throw new Error('Invalid display.permissions.nsfw property');

        if (this.display.permissions.member !== 'number'
        &&  this.display.permissions.member !== 'object') throw new Error('Invalid display.permissions.member property');

        this.display.data.name        = this.display.name.default;
        this.display.data.description = this.display.description.default;

        this.display.data.name_localizations        = deleteProperty(this.display.name,        'default');
        this.display.data.description_localizations = deleteProperty(this.display.description, 'default');

        this.display.data.options = this.display.options;

        this.display.data.dm_permission              = this.display.permissions.dm;
        this.display.data.nsfw                       = this.display.permissions.nsfw;
        this.display.data.default_member_permissions = this.display.permissions.member;
    };
};
