import { EventsUsed } from './Util.js';
import { EventBuilder } from './Event.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';

export type BotCallback = (_: {

    loadedEvents:                     EventBuilder[];
    loadedServices:                   ServiceBuilder[];
    loadedChatInputCommands:          ChatInputCommandBuilder[];
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[];
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[];

    usedEvents: EventsUsed;

    usedIntents:  number;
    usedPartials: number[];
}) => Promise<any> | any;

export interface ConfigOptions {

    /**
     * Library client.
     */
    bot: BotCallback;

    /**
     * Project directory.
     */
    project?: string;

    /**
     * Used files.
     */
    files?: {

        events?:                     string;
        services?:                   string;
        chatInputCommands?:          string;
        userContextMenuCommands?:    string;
        messageContextMenuCommands?: string;
    };

    /**
     * Used plugins.
     */
    plugins?: string[];
}

export class ConfigBuilder {

    /**
     * Library client.
     */
    bot: BotCallback = null!;

    /**
     * Project directory.
     */
    project = '.';

    /**
     * Used files.
     */
    files = {

        events:                     'src/**/*.event.*',
        services:                   'src/**/*.service.*',
        chatInputCommands:          'src/**/*.command.chat.*',
        userContextMenuCommands:    'src/**/*.command.user.*',
        messageContextMenuCommands: 'src/**/*.command.message.*'
    };

    /**
     * Used plugins.
     */
    plugins = [];

    constructor (options: ConfigOptions) {

        this.bot = options.bot;

        this.project = options.project ?? this.project;

        this.files.events                     = options.files?.events                     ?? this.files.events;
        this.files.services                   = options.files?.services                   ?? this.files.services;
        this.files.chatInputCommands          = options.files?.chatInputCommands          ?? this.files.chatInputCommands;
        this.files.userContextMenuCommands    = options.files?.userContextMenuCommands    ?? this.files.userContextMenuCommands;
        this.files.messageContextMenuCommands = options.files?.messageContextMenuCommands ?? this.files.messageContextMenuCommands;
    }
}
