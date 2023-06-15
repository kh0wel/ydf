import { DefaultEventFunction } from './Util.js';

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

    events: { [event: string]: DefaultEventFunction };
}

export class ChatInputCommandBuilder {

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

        name: { default: null! }, description: { default: null! },

        options: [],

        permissions: {

            member: null,

            dm: false, nsfw: false
        }
    };

    events: { [event: string]: DefaultEventFunction } = null!;

    constructor (options: ChatInputCommandOptions) {

        this.intents = options.intents ?? this.intents;

        this.display.name        = options.display.name;
        this.display.description = options.display.description;

        this.display.options = options.display.options ?? this.display.options;

        this.display.permissions.member = options.display.permissions?.member ?? this.display.permissions.member;
        this.display.permissions.dm     = options.display.permissions?.dm     ?? this.display.permissions.dm;
        this.display.permissions.nsfw   = options.display.permissions?.nsfw   ?? this.display.permissions.nsfw;

        this.events = options.events;
    }
}
