export interface ChatInputCommandOptions {

    intents?: number;

    display: {

        name: {

            default: string;

            [locale: string]: string;
        };

        description: {

            default: string;

            [locale: string]: string;
        };

        options?: any;

        permissions?: {

            member?: bigint | null;

            dm?:   boolean
            nsfw?: boolean
        }
    }

    events: {

        [event: string]: (parameters) => Promise<void> | void;
    }
}

export class ChatInputCommandBuilder {

    intents; display; events;

    constructor (data) {

        // https://discord.com/developers/docs/topics/gateway#gateway-intents
        this.intents = data.intents ?? 0;

        this.display = {

            // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
            type: 1,

            name:        data.display.name,
            description: data.display.description,

            options: data.display.options ?? [],

            permissions: {

                member: data.display.permissions?.member ?? null,

                dm:   data.display.permissions?.dm   ?? false,
                nsfw: data.display.permissions?.nsfw ?? false
            }
        };

        this.events = data.events;
    }
}
