export interface BaseOptions {

    /**
     * File name.
     */
    name: string;

    /**
     * File level.
     */
    level?: number;

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
     * File path.
     */
    path: string = null!;

    /**
     * File name.
     */
    name: string = null!;

    /**
     * File level.
     */
    level = 0;

    /**
     * Necessary intents (using bitwise with https://discord.com/developers/docs/topics/gateway#gateway-intents).
     */
    intents = 0;

    /**
     * Necessary partials (using array).
     */
    partials: number[] = [];

    constructor (opts: BaseOptions) {

        Object.assign(this, {

            name: opts.name,

            level:    opts.level    ?? this.level,
            intents:  opts.intents  ?? this.intents,
            partials: opts.partials ?? this.partials
        });
    }
}
