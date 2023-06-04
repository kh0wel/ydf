export class EventBuilder {

    name; path; intents; execute;

    constructor (data) {

        this.name = data.name;
        this.path = data.path;

        // https://discord.com/developers/docs/topics/gateway#gateway-intents
        this.intents = data.intents ?? 0;

        this.execute = data.execute;
    }
}
