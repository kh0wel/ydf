import { EventBuilder } from './Event.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder } from './ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from './UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from './MessageContextMenuCommand.js';

export type LoadedFile <Builder extends 

    EventBuilder |
    ServiceBuilder |
    ChatInputCommandBuilder |
    UserContextMenuCommandBuilder |
    MessageContextMenuCommandBuilder
> = Builder & {

    name: string;

    path: string;
};

export type GroupedEvent = {

    services: ServiceBuilder[],

    commands: (ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder)[]

    all: (ServiceBuilder | ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder)[]
};
