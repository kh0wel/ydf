import { SettingsBuilder } from './Settings.js';

export type DefaultExecuteParameters = {

    settings: SettingsBuilder,

    loadedEvents,
    loadedServices,
    loadedChatInputCommands,
    loadedMessageContextMenuCommands,
    loadedUserContextMenuCommands,

    usedEvents,
    usedIntents
};

export type DefaultExecuteFunction = (parameters: DefaultExecuteParameters) => Promise<void> | void;

export interface EventOptions {

    intents?: number;

    execute: DefaultExecuteFunction;
}

export class EventBuilder {

    name: string = null!;
    path: string = null!;

    type = 1;

    // https://discord.com/developers/docs/topics/gateway#gateway-intents
    intents = 0;

    execute: DefaultExecuteFunction = null!;

    constructor (options: EventOptions) {

        this.intents = options.intents ?? this.intents;

        this.execute = options.execute;
    }
}