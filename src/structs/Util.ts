import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';

export type HandledCallback <Parameters> = (parameters: Parameters) => Promise<void> | void;

export type GroupedService = ServiceBuilder;

export type GroupedCommand = ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder;

export type GroupedAll = GroupedService | GroupedCommand;

export interface GroupedEvent {

    services: GroupedService[];

    commands: GroupedCommand[];

    all: GroupedAll[];
}

export interface EventsGroup {

    [event: string]: GroupedEvent;
}
