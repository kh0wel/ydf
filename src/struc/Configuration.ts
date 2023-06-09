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

    target?: string[];

    ignore?: string[];
}

export class ConfigBuilder {

    session;

    target = [

        'src/**/*.event.*',
        'src/**/*.service.*',
        'src/**/*.command.chat.*',
        'src/**/*.command.user.*',
        'src/**/*.command.message.*',
    ];

    ignore: string[] = [];

    constructor (data: ConfigOptions) {

        this.session = data.session;

        this.target = data.target ?? this.target;
        this.ignore = data.ignore ?? this.ignore;
    }
}
