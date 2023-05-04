import deleteProperty from '../utilities/deleteProperty.js';

export default class {

    name = undefined;

    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
    type = 3;

    priority = 0;

    intents = [];

    partials = [];

    display = {
        
        name: { default: undefined },

        permissions: {

            member: null,

            dm: false, nsfw: false 
        },

        data: {

            name: undefined,

            name_localizations: {},

            dm_permission: false,
            nsfw:          false,

            default_member_permissions: null
        }
    };

    events = undefined;

    constructor (options) {

        this.name = options.name;

        this.priority = options.priority ?? this.priority;
        this.intents  = options.intents  ?? this.intents;
        this.partials = options.partials ?? this.partials;

        this.display.name = options.display.name;

        this.display.permissions.dm     = options.display.permissions?.dm     ?? this.display.permissions.dm;
        this.display.permissions.nsfw   = options.display.permissions?.nsfw   ?? this.display.permissions.nsfw;
        this.display.permissions.member = options.display.permissions?.member ?? this.display.permissions.member;

        ///

        this.display.data.name = this.display.name.default;

        this.display.data.name_localizations = deleteProperty(this.display.name, 'default');

        this.display.data.dm_permission              = this.display.permissions.dm;
        this.display.data.nsfw                       = this.display.permissions.nsfw;
        this.display.data.default_member_permissions = this.display.permissions.member;

        ///

        this.events = options.events;
    };
};
