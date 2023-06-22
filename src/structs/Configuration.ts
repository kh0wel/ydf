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

export type DeployerFunction = (parameters: DeployerParameters) => Session<boolean>;

export interface ConfigOptions {

    deployer: DeployerFunction;

    include?: Directories;

    exclude?: Directories;
}

export interface Directories {

    events: string[];

    services: string[];

    chatInputCommands: string[];

    userContextMenuCommands: string[];

    messageContextMenuCommands: string[];
}

export class ConfigBuilder {

    deployer: DeployerFunction = null!;

    include: Directories = {

        events:                     [ 'src/**/*.event.*'           ],
        services:                   [ 'src/**/*.service.*'         ],
        chatInputCommands:          [ 'src/**/*.command.chat.*'    ],
        userContextMenuCommands:    [ 'src/**/*.command.user.*'    ],
        messageContextMenuCommands: [ 'src/**/*.command.message.*' ]
    };

    exclude: Directories = {

        events:                     [],
        services:                   [],
        chatInputCommands:          [],
        userContextMenuCommands:    [],
        messageContextMenuCommands: []
    };

    constructor (options: ConfigOptions) {

        this.deployer = options.deployer;

        this.include = {

            events:                     options.include?.events                     ?? this.include.events,
            services:                   options.include?.services                   ?? this.include.services,
            chatInputCommands:          options.include?.chatInputCommands          ?? this.include.chatInputCommands,
            userContextMenuCommands:    options.include?.userContextMenuCommands    ?? this.include.userContextMenuCommands,
            messageContextMenuCommands: options.include?.messageContextMenuCommands ?? this.include.messageContextMenuCommands,
        };

        this.exclude = {

            events:                     options.exclude?.events                     ?? this.exclude.events,
            services:                   options.exclude?.services                   ?? this.exclude.services,
            chatInputCommands:          options.exclude?.chatInputCommands          ?? this.exclude.chatInputCommands,
            userContextMenuCommands:    options.exclude?.userContextMenuCommands    ?? this.exclude.userContextMenuCommands,
            messageContextMenuCommands: options.exclude?.messageContextMenuCommands ?? this.exclude.messageContextMenuCommands,
        };
    }
}
