import { Session } from '@biscuitland/core';

import { ConfigBuilder } from './Configuration.js';
import { BaseOptions, BaseBuilder } from './Base.js';

export interface ExecuteParameters {

    config: ConfigBuilder;

    session: Session<boolean>;

    loadedEvents;
    loadedServices;
    loadedChatInputCommands;
    loadedMessageContextMenuCommands;
    loadedUserContextMenuCommands;

    usedEvents;
    usedIntents;
}

export type ExecuteFunction = (parameters: ExecuteParameters) => Promise<void> | void;

export interface EventOptions extends BaseOptions {

    execute: ExecuteFunction;
}

export class EventBuilder extends BaseBuilder {

    execute: ExecuteFunction = null!;

    constructor (options: EventOptions) {

        super (options);

        this.execute = options.execute;
    }
}
