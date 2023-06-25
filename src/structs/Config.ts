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

    cwd?: string;

    include?: string[];

    exclude?: string[];

    plugins?: string[];
}

export class ConfigBuilder {

    bot: BotCallback = null!;

    cwd: string = '.';

    include: string[] = [

        'src/**/*.event.*',
        'src/**/*.service.*',
        'src/**/*.command.chat.*',
        'src/**/*.command.user.*',
        'src/**/*.command.message.*'
    ];

    exclude: string[] = [ '**/.*' ];

    plugins: string[] = [];

    constructor (options: ConfigOptions) {

        this.bot = options.bot;

        this.cwd     = options.cwd     ?? this.cwd;
        this.include = options.include ?? this.include;
        this.exclude = options.exclude ?? this.exclude;
    }
}
