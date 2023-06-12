import { BiscuitOptions } from '@biscuitland/core';

export interface ConfigOptions {

    session: () => BiscuitOptions;

    include?: string[];

    exclude?: string[];
}

export class ConfigBuilder {

    session: () => BiscuitOptions = undefined!;

    include: string[] = [

        'src/**/*.event.*',
        'src/**/*.service.*',
        'src/**/*.command.chat.*',
        'src/**/*.command.user.*',
        'src/**/*.command.message.*'
    ];

    exclude: string[] = [];

    constructor (options: ConfigOptions) {

        this.session = options.session;

        this.include = options.include ?? this.include;
        this.exclude = options.exclude ?? this.exclude;
    }
}
