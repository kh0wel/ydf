export class ServiceBuilder {

    name; path; intents; events;

    constructor (data) {

        this.name = data.name;
        this.path = data.path;

        // https://discord.com/developers/docs/topics/gateway#gateway-intents
        this.intents = data.intents ?? 0;

        this.events = data.events;
    }
}
