export class ServiceBuilder {

    name; intents; events;

    constructor (data) {

        this.name = data.name;

        // https://discord.com/developers/docs/topics/gateway#gateway-intents
        this.intents = data.intents ?? 0;

        this.events = data.events;
    }
}
