export interface BaseOptions {

    /**
     * Necessary intents (using bitwise with https://discord.com/developers/docs/topics/gateway#gateway-intents)
     */
    intents?: number;
}

export class BaseBuilder {

    /**
     * File name (excluding extensions)
     */
    name: string = null!;

    /**
     * File path (not relative)
     */
    path: string = null!;

    /**
     * Necessary intents (using bitwise with https://discord.com/developers/docs/topics/gateway#gateway-intents)
     */
    intents = 0;

    constructor (options: BaseOptions) {

        this.intents = options.intents ?? this.intents;
    }
}
