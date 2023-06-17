export type MessageContextMenuCommandDisplay = {

    name: {

        default: string;

        [locale: string]: string;
    };

    permissions?: {

        member?: bigint | null;

        dm?:   boolean;
        nsfw?: boolean;
    };
};

export interface MessageContextMenuCommandOptions {

    intents?: number;

    display: MessageContextMenuCommandDisplay;

    events: { [event: string]: (parameters: any) => Promise<void> | void };
}

export class MessageContextMenuCommandBuilder {

    type: number = 5;

    // https://discord.com/developers/docs/topics/gateway#gateway-intents
    intents: number = 0; 

    display: Required<MessageContextMenuCommandDisplay> & { type: number } = {

        // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
        type: 3,

        name: { default: null! },

        permissions: {

            member: null,

            dm: false, nsfw: false
        }
    };

    events: { [event: string]: (parameters: any) => Promise<void> | void } = null!;

    constructor (options: MessageContextMenuCommandOptions) {

        this.intents = options.intents ?? this.intents;

        this.display.name = options.display.name;

        this.display.permissions.member = options.display.permissions?.member ?? this.display.permissions.member;
        this.display.permissions.dm     = options.display.permissions?.dm     ?? this.display.permissions.dm;
        this.display.permissions.nsfw   = options.display.permissions?.nsfw   ?? this.display.permissions.nsfw;

        this.events = options.events;
    }
}
