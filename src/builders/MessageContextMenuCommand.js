import deleteProperty from '../utils/deleteProperty.js';

export default class {

    name = undefined;

    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
    type = 3;

    intents  = [];
    partials = [];

    display = {
        
        name: { default: undefined },

        permissions: {

            dm: false, nsfw: false,

            member: null
        },

        data: {

            name: undefined,

            name_localizations: {},

            default_member_permissions: null,

            dm_permission: false, nsfw: false
        }
    };

    events = undefined;

    constructor (options) {

        this.name = options.name;

        this.intents  = options.intents  ?? this.intents;
        this.partials = options.partials ?? this.partials;

        this.display = {

            name: options.display.name,

            permissions: {

                member: options.display.permissions?.member ?? this.display.permissions.member,
                dm:     options.display.permissions?.dm     ?? this.display.permissions.dm,
                nsfw:   options.display.permissions?.nsfw   ?? this.display.permissions.nsfw
            },

            data: {

                name: options.display.name.default,

                name_localizations: deleteProperty(options.display.name, 'default'),

                default_member_permissions: options.display.permissions?.member ?? this.display.data.default_member_permissions,
                dm_permission:              options.display.permissions?.dm     ?? this.display.data.dm_permission,
                nsfw:                       options.display.permissions?.nsfw   ?? this.display.data.nsfw
            }
        };

        this.events = options.events;
    };
};
