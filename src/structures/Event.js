export class EventBuilder {

    name; intents; execute;

    constructor (data) {

        this.name = data.name;

        // https://discord.com/developers/docs/topics/gateway#gateway-intents
        this.intents = data.intents ?? 0;

        this.execute = data.execute;
    }
}
