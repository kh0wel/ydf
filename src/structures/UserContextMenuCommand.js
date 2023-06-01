import findUsedLocales from '../findUsedLocales.js';

export class UserContextMenuCommandBuilder {

    name = undefined;

    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
    type = 2;

    level = 0;

    // https://discord.com/developers/docs/topics/gateway#gateway-intents
    intents = 0;

    display = {
        
        name: { default: undefined },

        permissions: {

            dm: false, nsfw: false,

            member: null
        },

        // https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
        data: {

            name: undefined,

            name_localizations: {},

            default_member_permissions: null,

            dm_permission: false, nsfw: false
        }
    };

    events = {};

    constructor (data) {

        this.name = data.name;

        this.level   = data.level   ?? this.level;
        this.intents = data.intents ?? this.intents;

        this.display = {

            name: data.display.name,

            permissions: {

                member: data.display.permissions?.member ?? this.display.permissions.member,
                dm:     data.display.permissions?.dm     ?? this.display.permissions.dm,
                nsfw:   data.display.permissions?.nsfw   ?? this.display.permissions.nsfw
            },

            data: {

                name: data.display.name.default,

                name_localizations: findUsedLocales(data.display.name),

                default_member_permissions: data.display.permissions?.member ?? this.display.data.default_member_permissions,
                dm_permission:              data.display.permissions?.dm     ?? this.display.data.dm_permission,
                nsfw:                       data.display.permissions?.nsfw   ?? this.display.data.nsfw
            }
        };

        this.events = data.events;
    };
};
