import { Session } from '@biscuitland/core';

import { EventBuilder } from './Event.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';
import { EventsGroup } from './Util.js';

export type SessionCallback = (parameters: {

    loadedEvents:                     EventBuilder[];
    loadedServices:                   ServiceBuilder[];
    loadedChatInputCommands:          ChatInputCommandBuilder[];
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[];
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[];

    usedEvents: EventsGroup;

    usedIntents: number;
}) => Session<boolean>;

export interface ConfigOptions {

    session: SessionCallback;

    root?: string;

    include?: string[];

    exclude?: string[];
}

export class ConfigBuilder {

    session: SessionCallback = null!;

    root = '.';

    include = [

        'src/**/*.event.*',
        'src/**/*.service.*',
        'src/**/*.command.chat.*',
        'src/**/*.command.user.*',
        'src/**/*.command.message.*'
    ];

    exclude = [ '**/.*' ];

    constructor (options: ConfigOptions) {

        this.session = options.session;

        this.root    = options.root    ?? this.root;
        this.include = options.include ?? this.include;
        this.exclude = options.exclude ?? this.exclude;
    }
}
