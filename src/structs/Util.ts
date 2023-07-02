import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';

export interface HandledEvents {

    [event: string]: (parameters: any) => Promise<void> | void
}

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
