export interface BaseOptions {

    /**
     * Necessary intents (using bitwise with https://discord.com/developers/docs/topics/gateway#gateway-intents).
     */
    intents?: number;

    /**
     * Necessary partials (using bitwise on array)
     */
    partials?: number[];
}

export class BaseBuilder {

    /**
     * File name (excluding extensions).
     */
    name: string = null!;

    /**
     * File path (not relative).
     */
    path: string = null!;

    /**
     * Necessary intents (using bitwise with https://discord.com/developers/docs/topics/gateway#gateway-intents).
     */
    intents: number = 0;

    /**
     * Necessary partials (using bitwise on array).
     */
    partials: number[] = [];

    constructor (options: BaseOptions) {

        this.intents  = options.intents  ?? this.intents;
        this.partials = options.partials ?? this.partials;
    }
}
