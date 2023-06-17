export interface ServiceOptions {

    intents?: number;

    events: { [event: string]: (parameters: any) => Promise<void> | void };
}

export class ServiceBuilder {

    type: number = 2;

    // https://discord.com/developers/docs/topics/gateway#gateway-intents
    intents: number = 0;

    events: { [event: string]: (parameters: any) => Promise<void> | void } = null!;

    constructor (data: ServiceOptions) {

        this.intents = data.intents ?? this.intents;

        this.events = data.events;
    }
}
