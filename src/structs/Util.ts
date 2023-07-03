import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';

export interface HandledEvents <Parameters, Callback extends (parameters: Parameters) => Promise<void> | void> {

    [event: string]: Callback;
}

export interface EventsUsed {

    [event: string]: {

        services: Array<ServiceBuilder>;
    
        commands: Array<ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder>;
    
        all: Array<ServiceBuilder | ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder>;
    };
}
