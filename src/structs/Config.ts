import { Session } from '@biscuitland/core';

import { EventBuilder } from './Event.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';
import { EventsGroup } from './Util.js';

export interface DeployerParameters {

    loadedEvents:                     EventBuilder[];
    loadedServices:                   ServiceBuilder[];
    loadedChatInputCommands:          ChatInputCommandBuilder[];
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[];
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[];

    usedEvents: EventsGroup;

    usedIntents: number;
}

export type DeployerFunction = (parameters: DeployerParameters) => Session<boolean>;

export interface ConfigOptions {

    deployer: DeployerFunction;

    include?: string[];

    exclude?: string[];
}

export class ConfigBuilder {

    deployer: DeployerFunction = null!;

    include = [

        'src/**/*.event.*',
        'src/**/*.service.*',
        'src/**/*.command.chat.*',
        'src/**/*.command.user.*',
        'src/**/*.command.message.*'
    ];

    exclude = [ '**/.*' ];

    constructor (options: ConfigOptions) {

        this.deployer = options.deployer;

        this.include = options.include ?? this.include;
        this.exclude = options.exclude ?? this.exclude;
    }
}
