export type ChatInputCommandDisplay = {

    name: {

        default: string;

        [locale: string]: string;
    };

    description: {

        default: string;

        [locale: string]: string;
    };

    options?: any[];

    permissions?: {

        member?: bigint | null;

        dm?:   boolean;
        nsfw?: boolean;
    };
};

export interface ChatInputCommandOptions {

    intents?: number;

    display: ChatInputCommandDisplay;

    events: { [event: string]: (parameters: any) => Promise<void> | void };
}

export class ChatInputCommandBuilder {

    type: number = 3;

    // https://discord.com/developers/docs/topics/gateway#gateway-intents
    intents: number = 0; 

    display: Required<ChatInputCommandDisplay> & { type: number } = {

        // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
        type: 1,

        name: { default: null! }, description: { default: null! },

        options: [],

        permissions: {

            member: null,

            dm: false, nsfw: false
        }
    };

    events: { [event: string]: (parameters: any) => Promise<void> | void } = null!;

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
