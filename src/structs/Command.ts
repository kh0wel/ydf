import { HandledEvents } from './Util.js';
import { BaseOptions, BaseBuilder } from './Base.js';

export interface CommandLocalizations {

    /**
     * Default to display.
     */
    default: string;

    /**
     * Localization to display.
     * 
     * More information on https://discord.com/developers/docs/reference#locales.
     */
    [locale: string]: string;
}

export interface CommandPermissions {

    /**
     * Member permissions to display.
     * 
     * More information on https://discord.com/developers/docs/topics/permissions.
     */
    member?: bigint | null;

    /**
     * Display on DM channels.
     */
    dm?: boolean;

    /**
     * Display on non NSFW channels.
     */
    nsfw?: boolean;
}

export interface SharedCommandDisplay {

    /**
     * Command type.
     * 
     * More information on https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types.
     */
    type: number;

    /**
     * Command name.
     */
    name: CommandLocalizations;

    /**
     * Command description.
     */
    description: CommandLocalizations;

    /**
     * Command options.
     * 
     * More information on https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure.
     */
    options?: any[];

    /**
     * Command permissions.
     */
    permissions?: CommandPermissions;
}

export interface SharedCommandOptions <Display> extends BaseOptions {

    /**
     * Command display.
     */
    display: Omit<Display, 'type'>;

    /**
     * Necessary events (using their file name with excluded extensions).
     */
    events: HandledEvents;
}

export class ChatInputCommandBuilder extends BaseBuilder {

    display: Required<SharedCommandDisplay> = {

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

    constructor (options: SharedCommandOptions<SharedCommandDisplay>) {

        super (options);

        Object.assign(this, {

            display: {

                name:        options.display.name,
                description: options.display.description,

                options: options.display.options ?? this.display.options,

                permissions: {

                    member: options.display.permissions?.member ?? this.display.permissions.member,
                    dm:     options.display.permissions?.dm     ?? this.display.permissions.dm,
                    nsfw:   options.display.permissions?.nsfw   ?? this.display.permissions.nsfw
                },

                type: this.display.type
            },

            events: options.events
        });
    }
}

export class UserContextMenuCommandBuilder extends BaseBuilder {

    display: Required<Omit<SharedCommandDisplay, 'description' | 'options'>> = {

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

    constructor (options: SharedCommandOptions<Omit<SharedCommandDisplay, 'description' | 'options'>>) {

        super (options);

        Object.assign(this, {

            display: {

                name: options.display.name,

                permissions: {

                    member: options.display.permissions?.member ?? this.display.permissions.member,
                    dm:     options.display.permissions?.dm     ?? this.display.permissions.dm,
                    nsfw:   options.display.permissions?.nsfw   ?? this.display.permissions.nsfw
                },

                type: this.display.type
            },

            events: options.events
        });
    }
}

export class MessageContextMenuCommandBuilder extends BaseBuilder {

    display: Required<Omit<SharedCommandDisplay, 'description' | 'options'>> = {

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

    constructor (options: SharedCommandOptions<Omit<SharedCommandDisplay, 'description' | 'options'>>) {

        super (options);

        Object.assign(this, {

            display: {

                name: options.display.name,

                permissions: {

                    member: options.display.permissions?.member ?? this.display.permissions.member,
                    dm:     options.display.permissions?.dm     ?? this.display.permissions.dm,
                    nsfw:   options.display.permissions?.nsfw   ?? this.display.permissions.nsfw
                },

                type: this.display.type
            },

            events: options.events
        });
    }
}
