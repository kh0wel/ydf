import { Session } from '@biscuitland/core';

export type DeployerParameters = {

    loadedEvents,
    loadedServices,
    loadedChatInputCommands,
    loadedMessageContextMenuCommands,
    loadedUserContextMenuCommands,

    usedEvents,
    usedIntents
};

export type DeployerFunction = (parameters: DeployerParameters) => Session;

export interface ConfigOptions {

    deployer: DeployerFunction;

    include?: string[];

    exclude?: string[];
}

export class ConfigBuilder {

    deployer: DeployerFunction = null!;

    include: string[] = [

        'src/**/*.event.*',
        'src/**/*.service.*',
        'src/**/*.command.chat.*',
        'src/**/*.command.user.*',
        'src/**/*.command.message.*'
    ];

    exclude: string[] = [];

    constructor (options: ConfigOptions) {

        this.deployer = options.deployer;

        this.include  = options.include  ?? this.include;
        this.exclude  = options.exclude  ?? this.exclude;
    }
}
