import { DefaultEventFunction } from './Util.js';

export interface ServiceOptions {

    intents?: number;

    events: { [event: string]: DefaultEventFunction };
}

export class ServiceBuilder {

    type = 2;

    // https://discord.com/developers/docs/topics/gateway#gateway-intents
    intents = 0;

    events: { [event: string]: DefaultEventFunction } = null!;

    constructor (data: ServiceOptions) {

        this.intents = data.intents ?? this.intents;

        this.events = data.events;
    }
}
