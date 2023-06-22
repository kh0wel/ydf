import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder } from './ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from './UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from './MessageContextMenuCommand.js';

export enum BuilderFrom {

    EVENT                        = 0,
    SERVICE                      = 1,
    CHAT_INPUT_COMMAND           = 2,
    USER_CONTEXT_MENU_COMMAND    = 3,
    MESSAGE_CONTEXT_MENU_COMMAND = 4
}

export interface CommandLocalizations {

    default: string;

    [locale: string]: string;
}

export interface CommandPermissions {

    member?: bigint | null;

    dm?:   boolean;
    nsfw?: boolean;
}

export type HandledEvents = {

    [event: string]: (parameters: any) => Promise<void> | void
};

export type GroupedService = ServiceBuilder;

export type GroupedCommand = ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder;

export type GroupedAll = GroupedService | GroupedCommand;

export interface GroupedEvent {

    services: GroupedService[],

    commands: GroupedCommand[]

    all: GroupedAll[]
}

export interface EventsGroup {

    [event: string]: GroupedEvent
}
