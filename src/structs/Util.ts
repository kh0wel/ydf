import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';

export enum DataFrom {

    EVENT                        = 0,
    SERVICE                      = 1,
    CHAT_INPUT_COMMAND           = 2,
    USER_CONTEXT_MENU_COMMAND    = 3,
    MESSAGE_CONTEXT_MENU_COMMAND = 4
}

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
