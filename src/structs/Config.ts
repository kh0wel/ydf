import { HandledCallback, EventsUsed } from './Util.js';
import { EventBuilder } from './Event.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';

export interface BotCallbackParameters {

    loadedEvents:                     EventBuilder[];
    loadedServices:                   ServiceBuilder[];
    loadedChatInputCommands:          ChatInputCommandBuilder[];
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[];
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[];

    usedEvents: EventsUsed;

    usedIntents:  number;
    usedPartials: number[];
}

export type BotCallback = HandledCallback<BotCallbackParameters>;

export interface ConfigOptions {

    /**
     * Library client.
     */
    bot: BotCallback;

    /**
     * Project path.
     */
    project?: string;

    /**
     * Used source.
     */
    source?: {

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
    bot: BotCallback = null!;

    /**
     * Project path.
     */
    project = '.';

    /**
     * Used source.
     */
    source = {

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

                events:                     options.source?.events                     ?? this.source.events,
                services:                   options.source?.services                   ?? this.source.services,
                chatInputCommands:          options.source?.chatInputCommands          ?? this.source.chatInputCommands,
                userContextMenuCommands:    options.source?.userContextMenuCommands    ?? this.source.userContextMenuCommands,
                messageContextMenuCommands: options.source?.messageContextMenuCommands ?? this.source.messageContextMenuCommands
            }
        });
    }
}
