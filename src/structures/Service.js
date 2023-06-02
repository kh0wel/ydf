export class ServiceBuilder {

    name; directory; intents; events;

    constructor (data) {

        this.name      = data.name;
        this.directory = data.directory;

        // https://discord.com/developers/docs/topics/gateway#gateway-intents
        this.intents = data.intents ?? 0;

        this.events = data.events;
    }
}
