export class ServiceBuilder {

    name; intents; events;

    constructor (data) {

        this.name = data.name;

        // https://discord.com/developers/docs/topics/gateway#gateway-intents
        this.intents = data.intents ?? this.intents;

        this.events = data.events;
    };
};
