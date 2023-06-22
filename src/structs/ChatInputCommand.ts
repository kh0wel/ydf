import { BaseOptions, BaseBuilder } from './Base.js';

import {

    HandledEvents,
    CommandLocalizations,
    CommandPermissions,
    DataFrom
}
    from './Util.js';

export interface ChatInputCommandDisplay {

    type: number;

    name: CommandLocalizations;

    description: CommandLocalizations;

    options: any[];

    permissions?: CommandPermissions;
}

export interface ChatInputCommandOptions extends BaseOptions {

    display: Omit<ChatInputCommandDisplay, 'type'>;

    events: HandledEvents
}

export class ChatInputCommandBuilder extends BaseBuilder {

    from = DataFrom.CHAT_INPUT_COMMAND;

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

    events: HandledEvents = null!;

    constructor (options: ChatInputCommandOptions) {

        super (options);

        this.display.name        = options.display.name;
        this.display.description = options.display.description;

        this.display.options = options.display.options;

        this.display.permissions.member = options.display.permissions?.member ?? this.display.permissions.member;
        this.display.permissions.dm     = options.display.permissions?.dm     ?? this.display.permissions.dm;
        this.display.permissions.nsfw   = options.display.permissions?.nsfw   ?? this.display.permissions.nsfw;

        this.events = options.events;
    }
}
