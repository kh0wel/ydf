export interface EventOptions {

    intents?: number;

    execute ({

        settings,

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedMessageContextMenuCommands,
        loadedUserContextMenuCommands,

        usedEvents,
        usedIntents
    }): Promise<void> | void
}

export class EventBuilder {

    type = 1;

    // https://discord.com/developers/docs/topics/gateway#gateway-intents
    intents = 0;

    execute;

    constructor (data: EventOptions) {

        this.intents = data.intents ?? this.intents;

        this.execute = data.execute;
    }
}
