export interface Plugin {

    deployer (config: ConfigBuilder): Promise<void> | void;
}

export interface ConfigOptions {

    cwd?: string;

    plugins: Plugin[];
}

export class ConfigBuilder {

    cwd = '.';

    plugins: Plugin[] = [];

    constructor (opts: ConfigOptions) {

        Object.assign(this, { cwd: opts.cwd ?? this.cwd });
    }
}
