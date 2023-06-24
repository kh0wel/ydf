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
}) => Session | Client;

export interface ConfigOptions {

    bot: BotCallback;

    root?: string;

    include?: string[];

    exclude?: string[];
}

export class ConfigBuilder {

    bot: BotCallback = null!;

    root: string = '.';

    include: string[] = [

        'src/**/*.event.*',
        'src/**/*.service.*',
        'src/**/*.command.chat.*',
        'src/**/*.command.user.*',
        'src/**/*.command.message.*'
    ];

    exclude: string[] = [ '**/.*' ];

    constructor (options: ConfigOptions) {

        this.bot = options.bot;

        this.root    = options.root    ?? this.root;
        this.include = options.include ?? this.include;
        this.exclude = options.exclude ?? this.exclude;
    }
}
