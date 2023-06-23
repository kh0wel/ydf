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

    target?: string;
}

export class ConfigBuilder {

    deployer: DeployerFunction = null!;

    target = 'src/**/*.{event,service,command.{chat,user,message}}.*';

    constructor (options: ConfigOptions) {

        this.deployer = options.deployer;

        this.target = options.target ?? this.target;
    }
}
