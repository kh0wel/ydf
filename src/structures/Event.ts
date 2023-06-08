export interface EventOptions {

    intents?: number;

    execute: (parameters) => Promise<void> | void
}

export class EventBuilder {

    execute;

    type = 1;

    // https://discord.com/developers/docs/topics/gateway#gateway-intents
    intents = 0;

    constructor (data: EventOptions) {

        this.intents = data.intents ?? this.intents;

        this.execute = data.execute;
    }
}
