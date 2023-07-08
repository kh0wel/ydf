import { BotCallback } from './Util.js';

export interface ConfigOptions {

    /**
     * Library client.
     */
    bot: BotCallback;

    /**
     * Base path.
     */
    cwd?: string;

    /**
     * Project sources.
     */
    sources?: {

        events?:                     string;
        services?:                   string;
        chatInputCommands?:          string;
        userContextMenuCommands?:    string;
        messageContextMenuCommands?: string;
    };
}

export class ConfigBuilder {

    /**
     * Library client.
     */
    bot: ReturnType<BotCallback> = null!;

    /**
     * Base path.
     */
    cwd = '.';

    /**
     * Project sources.
     */
    sources = {

        events:                     'src/**/*.vnt.*',
        services:                   'src/**/*.svc.*',
        chatInputCommands:          'src/**/*.cic.*',
        userContextMenuCommands:    'src/**/*.ucmc.*',
        messageContextMenuCommands: 'src/**/*.mcmc.*'
    };

    constructor (opts: ConfigOptions) {

        Object.assign(this, {

            bot: opts.bot,

            cwd: opts.cwd ?? this.cwd,

            sources: {

                events:                     opts.sources?.events                     ?? this.sources.events,
                services:                   opts.sources?.services                   ?? this.sources.services,
                chatInputCommands:          opts.sources?.chatInputCommands          ?? this.sources.chatInputCommands,
                userContextMenuCommands:    opts.sources?.userContextMenuCommands    ?? this.sources.userContextMenuCommands,
                messageContextMenuCommands: opts.sources?.messageContextMenuCommands ?? this.sources.messageContextMenuCommands
            }
        });
    }
}
