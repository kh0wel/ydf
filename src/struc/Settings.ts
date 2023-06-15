import { BiscuitOptions } from '@biscuitland/core';

export type DefaultSessionParameters = {

    loadedEvents,
    loadedServices,
    loadedChatInputCommands,
    loadedMessageContextMenuCommands,
    loadedUserContextMenuCommands,

    usedEvents,
    usedIntents
}

export type DefaultSessionFunction = (parameters: DefaultSessionParameters) => BiscuitOptions;

export interface SettingsOptions {

    session: DefaultSessionFunction;

    include?: string[];

    exclude?: string[];
}

export class SettingsBuilder {

    session: DefaultSessionFunction = null!;

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

        this.include = options.include ?? this.include;
        this.exclude = options.exclude ?? this.exclude;
    }
}
