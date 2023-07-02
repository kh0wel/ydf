import { ConfigBuilder, BotCallback } from './Config.js';
import { BaseOptions, BaseBuilder } from './Base.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';
import { EventsGroup } from './Util.js';

export type DeployCallback = (_: {

    config: ConfigBuilder;

    bot: ReturnType<BotCallback>;

    loadedEvents:                     EventBuilder[];
    loadedServices:                   ServiceBuilder[];
    loadedChatInputCommands:          ChatInputCommandBuilder[];
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[];
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[];

    usedEvents: EventsGroup;

    usedIntents:  number;
    usedPartials: number[];
}) => Promise<void> | void;

export interface EventOptions extends BaseOptions {

    /**
     * Function executed on deployment
     */
    deploy: DeployCallback;
}

export class EventBuilder extends BaseBuilder {

    /**
     * Function executed on deployment
     */
    deploy: DeployCallback = null!;

    constructor (options: EventOptions) {

        super (options);

        this.deploy = options.deploy;
    }
}
