export interface EventOptions {

    intents?: number;

    execute: (parameters) => Promise<void> | void
}

export class EventBuilder {

    // https://discord.com/developers/docs/topics/gateway#gateway-intents
    intents = 0; 

    execute (parameters) {}

    constructor (data: EventOptions) {

        this.intents = data.intents ?? this.intents;

        this.execute = data.execute;
    }
}
