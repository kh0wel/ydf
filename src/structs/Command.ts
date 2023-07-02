import { BaseOptions, BaseBuilder } from './Base.js';
import { HandledEvents } from './Util.js';

export interface CommandLocalizations {

    /**
     * Default to display
     */
    default: string;

    /**
     * Localization to display
     */
    [locale: string]: string;
}

export interface CommandPermissions {

    /**
     * Member permissions to display
     */
    member?: bigint | null;

    /**
     * Display on DM channels
     */
    dm?: boolean;

    /**
     * Display on non NSFW channels
     */
    nsfw?: boolean;
}

export interface ChatInputCommandDisplay {

    /**
     * Command type
     * 
     * More information on https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
     */
    type: number;

    /**
     * Command name
     */
    name: CommandLocalizations;

    /**
     * Command description
     */
    description: CommandLocalizations;

    /**
     * Command options
     */
    options?: any[];

    /**
     * Command permissions
     */
    permissions?: CommandPermissions;
}

export interface AnyContextMenuCommandDisplay {

    /**
     * Command type
     * 
     * More information on https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
     */
    type: number;

    /**
     * Command name
     */
    name: CommandLocalizations;

    /**
     * Command description
     */
    permissions?: CommandPermissions;
}

export interface CommandOptions <Display extends ChatInputCommandDisplay | AnyContextMenuCommandDisplay> extends BaseOptions {

    /**
     * Command display
     */
    display: Omit<Display, 'type'>;

    /**
     * Necessary events (using their file name with excluded extensions)
     */
    events: HandledEvents;
}

export class ChatInputCommandBuilder extends BaseBuilder {

    display: Required<ChatInputCommandDisplay> = {

        // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
        type: 1,

        name: { default: null! }, description: { default: null! },

        options: [],

        permissions: {

            member: null,

            dm: false, nsfw: false
        }
    };

    /**
     * Necessary events (using their file name with excluded extensions)
     */
    events: HandledEvents = null!;

    constructor (options: CommandOptions<ChatInputCommandDisplay>) {

        super (options);

        this.display.name        = options.display.name;
        this.display.description = options.display.description;

        this.display.options = options.display.options ?? this.display.options;

        this.display.permissions.member = options.display.permissions?.member ?? this.display.permissions.member;
        this.display.permissions.dm     = options.display.permissions?.dm     ?? this.display.permissions.dm;
        this.display.permissions.nsfw   = options.display.permissions?.nsfw   ?? this.display.permissions.nsfw;

        this.events = options.events;
    }
}

export class UserContextMenuCommandBuilder extends BaseBuilder {

    display: Required<AnyContextMenuCommandDisplay> = {

        // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
        type: 2,

        name: { default: null! },

        permissions: {

            member: null,

            dm: false, nsfw: false
        }
    };

    /**
     * Necessary events (using their file name with excluded extensions)
     */
    events: HandledEvents = null!;

    constructor (options: CommandOptions<AnyContextMenuCommandDisplay>) {

        super (options);

        this.display.name = options.display.name;

        this.display.permissions.member = options.display.permissions?.member ?? this.display.permissions.member;
        this.display.permissions.dm     = options.display.permissions?.dm     ?? this.display.permissions.dm;
        this.display.permissions.nsfw   = options.display.permissions?.nsfw   ?? this.display.permissions.nsfw;

        this.events = options.events;
    }
}

export class MessageContextMenuCommandBuilder extends BaseBuilder {

    display: Required<AnyContextMenuCommandDisplay> = {

        // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
        type: 3,

        name: { default: null! },

        permissions: {

            member: null,

            dm: false, nsfw: false
        }
    };

    /**
     * Necessary events (using their file name with excluded extensions)
     */
    events: HandledEvents = null!;

    constructor (options: CommandOptions<AnyContextMenuCommandDisplay>) {

        super (options);

        this.display.name = options.display.name;

        this.display.permissions.member = options.display.permissions?.member ?? this.display.permissions.member;
        this.display.permissions.dm     = options.display.permissions?.dm     ?? this.display.permissions.dm;
        this.display.permissions.nsfw   = options.display.permissions?.nsfw   ?? this.display.permissions.nsfw;

        this.events = options.events;
    }
}
