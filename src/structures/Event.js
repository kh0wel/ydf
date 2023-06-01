export class EventBuilder {

    name; level; intents; execute;

    constructor (data) {

        this.name = data.name;

        this.level = data.level ?? 0;

        // https://discord.com/developers/docs/topics/gateway#gateway-intents
        this.intents = data.intents ?? this.intents;

        this.execute = data.execute;
    }
}
