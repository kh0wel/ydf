export interface MessageContextMenuCommandOptions {

    intents?: number;

    display: {

        name: {

            default: string;

            [locale: string]: string;
        };

        permissions?: {

            member?: bigint | null;

            dm?:   boolean;
            nsfw?: boolean;
        }
    }

    events: {

        [event: string]: (parameters) => Promise<void> | void;
    }
}

export class MessageContextMenuCommandBuilder {

    // https://discord.com/developers/docs/topics/gateway#gateway-intents
    intents = 0; 

    display: {

        type: number;

        name: {

            default: string;

            [locale: string]: string;
        };

        permissions: {

            member: bigint | null;

            dm:   boolean;
            nsfw: boolean;
        };
    } = {

        // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
        type: 3,

        name: { default: 'empty' },

        permissions: {

            member: null,

            dm: false, nsfw: false
        }
    };

    events = {};

    constructor (data: MessageContextMenuCommandOptions) {

        this.intents = data.intents ?? this.intents;

        this.display.name = data.display.name;

        this.display.permissions.member = data.display.permissions?.member ?? this.display.permissions.member;
        this.display.permissions.dm     = data.display.permissions?.dm     ?? this.display.permissions.dm;
        this.display.permissions.nsfw   = data.display.permissions?.nsfw   ?? this.display.permissions.nsfw;

        this.events = data.events;
    }
}
