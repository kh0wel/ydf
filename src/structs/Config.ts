import { Session } from '@biscuitland/core';
import { Client } from '@discordjs/core';

import { EventBuilder } from './Event.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';
import { EventsGroup } from './Util.js';

export type BotCallback = (parameters: {

    loadedEvents:                     EventBuilder[];
    loadedServices:                   ServiceBuilder[];
    loadedChatInputCommands:          ChatInputCommandBuilder[];
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[];
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[];

    usedEvents: EventsGroup;

    usedIntents: number;
    usedPartials: number[];
}) => Session | Client;

export interface ConfigOptions {

    bot: BotCallback;

    root?: string;

    source?: {

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

    source = {

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

        this.source.events                     = options.source?.events                     ?? this.source.events;
        this.source.services                   = options.source?.services                   ?? this.source.services;
        this.source.chatInputCommands          = options.source?.chatInputCommands          ?? this.source.chatInputCommands;
        this.source.userContextMenuCommands    = options.source?.userContextMenuCommands    ?? this.source.userContextMenuCommands;
        this.source.messageContextMenuCommands = options.source?.messageContextMenuCommands ?? this.source.messageContextMenuCommands;
    }
}
