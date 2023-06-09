import { BiscuitOptions } from '@biscuitland/core';

export interface ConfigOptions {

    session ({

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedMessageContextMenuCommands,
        loadedUserContextMenuCommands,

        usedEvents,
        usedIntents
    }): BiscuitOptions;

    include?: string[];

    exclude?: string[];
}

export class ConfigBuilder {

    session;

    include = [

        'src/**/*.event.*',
        'src/**/*.service.*',
        'src/**/*.command.chat.*',
        'src/**/*.command.user.*',
        'src/**/*.command.message.*',
    ];

    exclude: string[] = [];

    constructor (data: ConfigOptions) {

        this.session = data.session;

        this.include = data.include ?? this.include;
        this.exclude = data.exclude ?? this.exclude;
    }
}
