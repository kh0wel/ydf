import { Session } from '@biscuitland/core';

import { EventBuilder } from './Event.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder } from './ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from './UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from './MessageContextMenuCommand.js';
import { EventsGroup } from './Util.js';

export interface DeployerParameters {

    loadedEvents:                     EventBuilder[],
    loadedServices:                   ServiceBuilder[],
    loadedChatInputCommands:          ChatInputCommandBuilder[],
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[],
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[],

    usedEvents: EventsGroup,

    usedIntents: number
}

export type DeployerFunction = (parameters: DeployerParameters) => Session<boolean>;

export interface ConfigurationOptions {

    deployer: DeployerFunction;

    include?: Targets;

    exclude?: Targets;
}

export interface Targets {

    events: string[];

    services: string[];

    chatInputCommands: string[];

    userContextMenuCommands: string[];

    messageContextMenuCommands: string[];
}

export class ConfigurationBuilder {

    deployer: DeployerFunction = null!;

    include: Targets = {

        events:                     [ 'src/**/*.event.*'           ],
        services:                   [ 'src/**/*.service.*'         ],
        chatInputCommands:          [ 'src/**/*.command.chat.*'    ],
        userContextMenuCommands:    [ 'src/**/*.command.user.*'    ],
        messageContextMenuCommands: [ 'src/**/*.command.message.*' ]
    };

    exclude: Targets = {

        events:                     [],
        services:                   [],
        chatInputCommands:          [],
        userContextMenuCommands:    [],
        messageContextMenuCommands: []
    };

    constructor (options: ConfigurationOptions) {

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
