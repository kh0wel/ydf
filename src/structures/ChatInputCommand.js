import findUsedLocales from '../findUsedLocales.js';

export class ChatInputCommandBuilder {

    name; intents; display; events;

    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
    type = 1;

    constructor (data) {

        this.name = data.name;

        // https://discord.com/developers/docs/topics/gateway#gateway-intents
        this.intents = data.intents ?? 0;

        this.display = {

            name:        data.display.name,
            description: data.display.description,

            options: data.display.options ?? [],

            permissions: {

                member: data.display.permissions?.member ?? null,

                dm:   data.display.permissions?.dm   ?? false,
                nsfw: data.display.permissions?.nsfw ?? false
            },

            // https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
            data: {

                name:        data.display.name.default,
                description: data.display.description.default,

                name_localizations:        findUsedLocales(data.display.name),
                description_localizations: findUsedLocales(data.display.description),

                options: data.display.options ?? [],

                default_member_permissions: data.display.permissions?.member ?? null,

                dm_permission: data.display.permissions?.dm   ?? false,
                nsfw:          data.display.permissions?.nsfw ?? false
            }
        };

        this.events = data.events;
    };
};
