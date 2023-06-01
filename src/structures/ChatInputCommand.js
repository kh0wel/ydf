import findUsedLocales from '../findUsedLocales.js';

export class ChatInputCommandBuilder {

    name = undefined;

    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
    type = 1;

    level = 0;

    // https://discord.com/developers/docs/topics/gateway#gateway-intents
    intents = 0;

    display = {

        name: { default: undefined }, description: { default: undefined },

        options: [],

        permissions: {

            dm: false, nsfw: false,

            member: null
        },

        // https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
        data: {

            name: undefined, description: undefined,

            name_localizations: {}, description_localizations: {},

            options: [],

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

            name:        data.display.name,
            description: data.display.description,

            options: data.display.options ?? this.display.options,

            permissions: {

                member: data.display.permissions?.member ?? this.display.permissions.member,
                dm:     data.display.permissions?.dm     ?? this.display.permissions.dm,
                nsfw:   data.display.permissions?.nsfw   ?? this.display.permissions.nsfw
            },

            data: {

                name:        data.display.name.default,
                description: data.display.description.default,

                name_localizations:        findUsedLocales(data.display.name),
                description_localizations: findUsedLocales(data.display.description),

                options: data.display.options ?? this.display.data.options,

                default_member_permissions: data.display.permissions?.member ?? this.display.data.default_member_permissions,
                dm_permission:              data.display.permissions?.dm     ?? this.display.data.dm_permission,
                nsfw:                       data.display.permissions?.nsfw   ?? this.display.data.nsfw
            }
        };

        this.events = data.events;
    };
};
