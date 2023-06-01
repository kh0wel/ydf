import findUsedLocales from '../findUsedLocales.js';

export class UserContextMenuCommandBuilder {

    name; level; intents; display; events;

    // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
    type = 2;

    constructor (data) {

        this.name = data.name;

        this.level = data.level ?? 0;

        // https://discord.com/developers/docs/topics/gateway#gateway-intents
        this.intents = data.intents ?? 0;

        this.display = {

            name: data.display.name,

            permissions: {

                member: data.display.permissions?.member ?? null,

                dm:   data.display.permissions?.dm   ?? false,
                nsfw: data.display.permissions?.nsfw ?? false
            },

            // https://discord.com/developers/docs/interactions/application-commands#create-global-application-command
            data: {

                name: data.display.name.default,

                name_localizations: findUsedLocales(data.display.name),

                default_member_permissions: data.display.permissions?.member ?? null,

                dm_permission: data.display.permissions?.dm   ?? false,
                nsfw:          data.display.permissions?.nsfw ?? false
            }
        };

        this.events = data.events;
    };
};
