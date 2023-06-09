export interface ConfigurationOptions {

    session ({

        laodedEvents,
        laodedServices,
        laodedChatInputCommands,
        loadedMessageContextMenuCommands,
        loadedUserContextMenuCommands,

        usedEvents,
        usedIntents
    }): Promise<void> | void;

    include?: string[];

    exclude?: string[];
}

export class ConfigurationBuilder {

    session;

    include = [

        'src/**/*.event.*',
        'src/**/*.service.*',
        'src/**/*.command.chat.*',
        'src/**/*.command.user.*',
        'src/**/*.command.message.*',
    ];

    exclude: string[] = [];

    constructor (data: ConfigurationOptions) {

        this.session = data.session;

        this.include = data.include ?? this.include;
        this.exclude = data.exclude ?? this.exclude;
    }
}
