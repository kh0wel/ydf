import { EventsUsed, HandledCallback } from './Util.js';
import { ConfigBuilder } from './Config.js';
import { BaseOptions, BaseBuilder } from './Base.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';

export interface HandledEventParameters {

    config: ConfigBuilder;

    bot: any;

    loadedEvents:                     EventBuilder[];
    loadedServices:                   ServiceBuilder[];
    loadedChatInputCommands:          ChatInputCommandBuilder[];
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[];
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[];

    usedEvents: EventsUsed;

    usedIntents:  number;
    usedPartials: number[];
}

export type HandledEventCallback = HandledCallback<HandledEventParameters>;

export interface DeployEventParameters {

    config: ConfigBuilder;

    bot: any;

    loadedEvents:                     EventBuilder[];
    loadedServices:                   ServiceBuilder[];
    loadedChatInputCommands:          ChatInputCommandBuilder[];
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[];
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[];

    usedEvents: EventsUsed;

    usedIntents:  number;
    usedPartials: number[];
}

export type EventDeployCallback = HandledCallback<DeployEventParameters>;

export interface EventOptions extends BaseOptions {

    /**
     * Function to execute (on deployment).
     */
    deploy: EventDeployCallback;
}

export class EventBuilder extends BaseBuilder {

    /**
     * Function to execute (on deployment).
     */
    deploy: EventDeployCallback = null!;

    constructor (options: EventOptions) {

        super (options);

        this.deploy = options.deploy;
    }
}
