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

        options?;

        permissions?: {

            member?: bigint | null;

            dm?:   boolean;
            nsfw?: boolean;
        };
    };

    events: { [event: string]: (parameters) => Promise<void> | void; };
}

export class ChatInputCommandBuilder {

    name = 'empty';
    path = 'empty';

    type = 3;

    // https://discord.com/developers/docs/topics/gateway#gateway-intents
    intents = 0; 

    display: {

        type: number;

        name: {

            default: string;

            [locale: string]: string;
        };

        description: {

            default: string;

            [locale: string]: string;
        };

        options;

        permissions: {

            member: bigint | null;

            dm:   boolean;
            nsfw: boolean;
        };
    } = {

        // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
        type: 1,

        name: { default: 'empty' }, description: { default: 'empty' },

        options: [],

        permissions: {

            member: null,

            dm: false, nsfw: false
        }
    };

    events;

    constructor (data: ChatInputCommandOptions) {

        this.intents = data.intents ?? this.intents;

        this.display.name        = data.display.name;
        this.display.description = data.display.description;

        this.display.options = data.display.options ?? this.display.options;

        this.display.permissions.member = data.display.permissions?.member ?? this.display.permissions.member;
        this.display.permissions.dm     = data.display.permissions?.dm     ?? this.display.permissions.dm;
        this.display.permissions.nsfw   = data.display.permissions?.nsfw   ?? this.display.permissions.nsfw;

        this.events = data.events;
    }
}
