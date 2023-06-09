import { BiscuitOptions } from "@biscuitland/core";

export interface SettingsOptions {

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

export class SettingsBuilder {

    session;

    include = [

        'src/**/*.event.*',
        'src/**/*.service.*',
        'src/**/*.command.chat.*',
        'src/**/*.command.user.*',
        'src/**/*.command.message.*',
    ];

    exclude: string[] = [];

    constructor (data: SettingsOptions) {

        this.session = data.session;

        this.include = data.include ?? this.include;
        this.exclude = data.exclude ?? this.exclude;
    }
}
