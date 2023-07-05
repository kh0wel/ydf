import { BotCallback } from './Util.js';

export interface ConfigOptions {

    /**
     * Created library client.
     */
    bot: BotCallback;

    /**
     * Project directory path.
     */
    project?: string;

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
     * Created library client.
     */
    bot: BotCallback = null!;

    /**
     * Project directory path.
     */
    project = '.';

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

    constructor (options: ConfigOptions) {

        Object.assign(this, {

            bot: options.bot,

            project: options.project ?? this.project,

            source: {

                events:                     options.sources?.events                     ?? this.sources.events,
                services:                   options.sources?.services                   ?? this.sources.services,
                chatInputCommands:          options.sources?.chatInputCommands          ?? this.sources.chatInputCommands,
                userContextMenuCommands:    options.sources?.userContextMenuCommands    ?? this.sources.userContextMenuCommands,
                messageContextMenuCommands: options.sources?.messageContextMenuCommands ?? this.sources.messageContextMenuCommands
            }
        });
    }
}
