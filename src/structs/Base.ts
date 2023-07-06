export interface BaseOptions {

    /**
     * Necessary intents (using bitwise with https://discord.com/developers/docs/topics/gateway#gateway-intents).
     */
    intents?: number;

    /**
     * Necessary partials (using array).
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
     * Necessary partials (using array).
     */
    partials: number[] = [];

    constructor (opts: BaseOptions) {

        Object.assign(this, {

            intents:  opts.intents  ?? this.intents,
            partials: opts.partials ?? this.partials
        });
    }
}
