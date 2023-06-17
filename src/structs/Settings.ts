import { BiscuitOptions } from '@biscuitland/core';

export type SessionParameters = {

    loadedEvents,
    loadedServices,
    loadedChatInputCommands,
    loadedMessageContextMenuCommands,
    loadedUserContextMenuCommands,

    usedEvents,
    usedIntents
}

export type SessionFunction = (parameters: SessionParameters) => BiscuitOptions;

export interface SettingsOptions {

    session: SessionFunction;

    include?: string[];

    exclude?: string[];
}

export class SettingsBuilder {

    session: SessionFunction = null!;

    include: string[] = [

        'src/**/*.event.*',
        'src/**/*.service.*',
        'src/**/*.command.chat.*',
        'src/**/*.command.user.*',
        'src/**/*.command.message.*'
    ];

    exclude: string[] = [];

    constructor (options: SettingsOptions) {

        this.session = options.session;

        this.include  = options.include  ?? this.include;
        this.exclude  = options.exclude  ?? this.exclude;
    }
}
