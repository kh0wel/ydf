import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder } from './ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from './UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from './MessageContextMenuCommand.js';

export type GroupedService = ServiceBuilder;

export type GroupedCommand = ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder;

export type GroupedAll = GroupedService | GroupedCommand;

export type GroupedEvent = {

    services: GroupedService[],

    commands: GroupedCommand[]

    all: GroupedAll[]
};

export type EventsGroup = { [event: string]: GroupedEvent };
