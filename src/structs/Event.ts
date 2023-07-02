import { Session } from '@biscuitland/core';
import { Client } from '@discordjs/core';

import { BaseOptions, BaseBuilder } from './Base.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';
import { DataFrom, EventsGroup } from './Util.js';

export type ExecuteCallback = (parameters: {

    config: any;

    bot: Session | Client;

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

    from = DataFrom.EVENT;

    /**
     * Function executed on deployment
     */
    execute: ExecuteCallback = null!;

    constructor (options: EventOptions) {

        super (options);

        this.execute = options.execute;
    }
}
