export interface ServiceOptions {

    intents?: number;

    events: {

        [event: string]: (parameters) => Promise<void> | void;
    }
}

export class ServiceBuilder {

    // https://discord.com/developers/docs/topics/gateway#gateway-intents
    intents = 0; 

    events = {};

    constructor (data: ServiceOptions) {

        this.intents = data.intents ?? this.intents;

        this.events = data.events;
    }
}
