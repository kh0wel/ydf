export class ServiceBuilder {

    name; level; intents; events;

    constructor (data) {

        this.name = data.name;

        this.level = data.level ?? 0;

        // https://discord.com/developers/docs/topics/gateway#gateway-intents
        this.intents = data.intents ?? this.intents;

        this.events = data.events;
    };
};
