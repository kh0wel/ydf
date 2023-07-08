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

export interface SharedCommandOptions <CommandDisplay> extends BaseOptions {

    /**
     * Command display.
     */
    display: Omit<CommandDisplay, 'type'>;

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

    constructor (opts: SharedCommandOptions<SharedCommandDisplay>) {

        super (opts);

        Object.assign(this, {

            display: {

                type: this.display.type,

                name:        opts.display.name,
                description: opts.display.description,

                options: opts.display.options ?? this.display.options,

                permissions: {

                    member: opts.display.permissions?.member ?? this.display.permissions.member,
                    dm:     opts.display.permissions?.dm     ?? this.display.permissions.dm,
                    nsfw:   opts.display.permissions?.nsfw   ?? this.display.permissions.nsfw
                }
            },

            events: opts.events
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

    constructor (opts: SharedCommandOptions<Omit<SharedCommandDisplay, 'description' | 'options'>>) {

        super (opts);

        Object.assign(this, {

            display: {

                type: this.display.type,

                name: opts.display.name,

                permissions: {

                    member: opts.display.permissions?.member ?? this.display.permissions.member,
                    dm:     opts.display.permissions?.dm     ?? this.display.permissions.dm,
                    nsfw:   opts.display.permissions?.nsfw   ?? this.display.permissions.nsfw
                }
            },

            events: opts.events
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

    constructor (opts: SharedCommandOptions<Omit<SharedCommandDisplay, 'description' | 'options'>>) {

        super (opts);

        Object.assign(this, {

            display: {

                type: this.display.type,

                name: opts.display.name,

                permissions: {

                    member: opts.display.permissions?.member ?? this.display.permissions.member,
                    dm:     opts.display.permissions?.dm     ?? this.display.permissions.dm,
                    nsfw:   opts.display.permissions?.nsfw   ?? this.display.permissions.nsfw
                }
            },

            events: opts.events
        });
    }
}
