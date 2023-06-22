import { Session } from '@biscuitland/core';

import { ConfigurationBuilder } from './Configuration.js';
import { BaseOptions, BaseBuilder } from './Base.js';
import { DataFrom } from './Util.js';

export interface ExecuteParameters {

    config: ConfigurationBuilder;

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

    from = DataFrom.EVENT;

    execute: ExecuteFunction = null!;

    constructor (options: EventOptions) {

        super (options);

        this.execute = options.execute;
    }
}
