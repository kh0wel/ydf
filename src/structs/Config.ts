import { BotCallback } from './Util.js';

export interface ConfigOptions {

    /**
     * Library client.
     */
    bot: BotCallback;

    /**
     * Project path.
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
     * Project path.
     */
    cwd = '.';

    /**
     * Project sources.
     */
    sources = {

        events:                     'src/**/*.event.*',
        services:                   'src/**/*.service.*',
        chatInputCommands:          'src/**/*.command.chat.*',
        userContextMenuCommands:    'src/**/*.command.user.*',
        messageContextMenuCommands: 'src/**/*.command.message.*'
    };

    constructor (opts: ConfigOptions) {

        Object.assign(this, {

            bot: opts.bot,

            cwd: opts.cwd ?? this.cwd,

            source: {

                events:                     opts.sources?.events                     ?? this.sources.events,
                services:                   opts.sources?.services                   ?? this.sources.services,
                chatInputCommands:          opts.sources?.chatInputCommands          ?? this.sources.chatInputCommands,
                userContextMenuCommands:    opts.sources?.userContextMenuCommands    ?? this.sources.userContextMenuCommands,
                messageContextMenuCommands: opts.sources?.messageContextMenuCommands ?? this.sources.messageContextMenuCommands
            }
        });
    }
}
