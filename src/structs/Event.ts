import { ConfigBuilder } from './Config.js';
import { BaseOptions, BaseBuilder } from './Base.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';
import { EventsGroup } from './Util.js';

export type ExecuteCallback = (_: {

    config: ConfigBuilder;

    bot: any;

    loadedEvents:                     EventBuilder[];
    loadedServices:                   ServiceBuilder[];
    loadedChatInputCommands:          ChatInputCommandBuilder[];
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[];
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[];

    usedEvents: EventsGroup;

    usedIntents: number;
    usedPartials: number[];
}) => Promise<void> | void;

export interface EventOptions extends BaseOptions {

    /**
     * Function executed on deployment
     */
    execute: ExecuteCallback;
}

export class EventBuilder extends BaseBuilder {

    /**
     * Function executed on deployment
     */
    execute: ExecuteCallback = null!;

    constructor (options: EventOptions) {

        super (options);

        this.execute = options.execute;
    }
}
