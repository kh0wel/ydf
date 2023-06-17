import { Session } from '@biscuitland/core';

import { SettingsBuilder } from './Settings.js';

export type ExecuteParameters = {

    settings: SettingsBuilder;

    session: Session<boolean>;

    loadedEvents;
    loadedServices;
    loadedChatInputCommands;
    loadedMessageContextMenuCommands;
    loadedUserContextMenuCommands;

    usedEvents;
    usedIntents;
};

export type ExecuteFunction = (parameters: ExecuteParameters) => Promise<void> | void;

export interface EventOptions {

    intents?: number;

    execute: ExecuteFunction;
}

export class EventBuilder {

    type: number = 1;

    // https://discord.com/developers/docs/topics/gateway#gateway-intents
    intents: number = 0;

    execute: ExecuteFunction = null!;

    constructor (options: EventOptions) {

        this.intents = options.intents ?? this.intents;

        this.execute = options.execute;
    }
}