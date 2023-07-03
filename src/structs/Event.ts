import { EventsGroup, HandledCallback } from './Util.js';
import { ConfigBuilder } from './Config.js';
import { BaseOptions, BaseBuilder } from './Base.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';

export interface HandledEvents <Callback extends Function> {

    [event: string]: Callback;
}

export type EventCallback = HandledCallback<{

    config: ConfigBuilder;

    bot: any;

    loadedEvents:                     EventBuilder[];
    loadedServices:                   ServiceBuilder[];
    loadedChatInputCommands:          ChatInputCommandBuilder[];
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[];
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[];

    usedEvents: EventsGroup;

    usedIntents:  number;
    usedPartials: number[];
}>;

export interface EventOptions extends BaseOptions {

    /**
     * Function to execute (on deployment).
     */
    deploy: EventCallback;
}

export class EventBuilder extends BaseBuilder {

    /**
     * Function to execute (on deployment).
     */
    deploy: EventCallback = null!;

    constructor (options: EventOptions) {

        super (options);

        this.deploy = options.deploy;
    }
}
