export class EventBuilder {

    intents; execute;

    constructor (data) {

        // https://discord.com/developers/docs/topics/gateway#gateway-intents
        this.intents = data.intents ?? 0;

        this.execute = data.execute;
    }
}
