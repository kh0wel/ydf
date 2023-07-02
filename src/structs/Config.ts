import { EventBuilder } from './Event.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';
import { EventsGroup } from './Util.js';

export type BotCallback = (_: {

    loadedEvents:                     EventBuilder[];
    loadedServices:                   ServiceBuilder[];
    loadedChatInputCommands:          ChatInputCommandBuilder[];
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[];
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[];

    usedEvents: EventsGroup;

    usedIntents: number;
    usedPartials: number[];
}) => any;

export interface ConfigOptions {

    bot: BotCallback;

    root?: string;

    files?: {

        events?:                     string,
        services?:                   string,
        chatInputCommands?:          string,
        userContextMenuCommands?:    string,
        messageContextMenuCommands?: string
    };

    plugins?: string[];
}

export class ConfigBuilder {

    bot: BotCallback = null!;

    root = '.';

    files = {

        events:                     'src/**/*.event.*',
        services:                   'src/**/*.service.*',
        chatInputCommands:          'src/**/*.command.chat.*',
        userContextMenuCommands:    'src/**/*.command.user.*',
        messageContextMenuCommands: 'src/**/*.command.message.*'
    }

    plugins = [];

    constructor (options: ConfigOptions) {

        this.bot = options.bot;

        this.root = options.root ?? this.root;

        this.files.events                     = options.files?.events                     ?? this.files.events;
        this.files.services                   = options.files?.services                   ?? this.files.services;
        this.files.chatInputCommands          = options.files?.chatInputCommands          ?? this.files.chatInputCommands;
        this.files.userContextMenuCommands    = options.files?.userContextMenuCommands    ?? this.files.userContextMenuCommands;
        this.files.messageContextMenuCommands = options.files?.messageContextMenuCommands ?? this.files.messageContextMenuCommands;
    }
}
