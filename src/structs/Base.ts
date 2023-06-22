export interface BaseOptions {

    /**
     * Used intents
     * 
     * More information on https://discord.com/developers/docs/topics/gateway#gateway-intents
     */
    intents?: number;
}

export class BaseBuilder {

    name: string = null!;

    path: string = null!;

    /**
     * Used intents
     * 
     * More information on https://discord.com/developers/docs/topics/gateway#gateway-intents
     */
    intents: number = 0;

    constructor (options: BaseOptions) {

        this.intents = options.intents ?? this.intents;
    }
}
