export class EventBuilder {

    name; intents; execute;

    constructor (data) {

        this.name = data.name;

        // https://discord.com/developers/docs/topics/gateway#gateway-intents
        this.intents = data.intents ?? this.intents;

        this.execute = data.execute;
    };
};
