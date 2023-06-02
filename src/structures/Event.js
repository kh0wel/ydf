export class EventBuilder {

    name; directory; intents; execute;

    constructor (data) {

        this.name      = data.name;
        this.directory = data.directory;

        // https://discord.com/developers/docs/topics/gateway#gateway-intents
        this.intents = data.intents ?? 0;

        this.execute = data.execute;
    }
}
