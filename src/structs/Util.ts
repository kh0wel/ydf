import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder } from './ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from './UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from './MessageContextMenuCommand.js';

export interface CommandLocalizations {

    default: string;

    [locale: string]: string;
}

export interface CommandPermissions {

    member: bigint | null;

    dm:   boolean;
    nsfw: boolean;
}

export type HandledEvents = {

    [event: string]: (parameters: any) => Promise<void> | void
};

export type GroupedService = ServiceBuilder;

export type GroupedCommand = ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder;

export type GroupedAll = GroupedService | GroupedCommand;

export type GroupedEvent = {

    services: GroupedService[],

    commands: GroupedCommand[]

    all: GroupedAll[]
};

export type EventsGroup = {

    [event: string]: GroupedEvent
};
