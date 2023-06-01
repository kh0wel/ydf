import findUsedLocales from '../findUsedLocales.js';

export class ChatInputCommandBuilder {

    name; level; intents; display; events;

    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
    type = 1;

    constructor (data) {

        this.name = data.name;

        this.level = data.level ?? 0;

        // https://discord.com/developers/docs/topics/gateway#gateway-intents
        this.intents = data.intents ?? 0;

        this.display = {

            name:        data.display.name,
            description: data.display.description,

            options: data.display.options ?? this.display.options,

            permissions: {

                member: data.display.permissions?.member ?? this.display.permissions.member,
                dm:     data.display.permissions?.dm     ?? this.display.permissions.dm,
                nsfw:   data.display.permissions?.nsfw   ?? this.display.permissions.nsfw
            },

            // https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
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
