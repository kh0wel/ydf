import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';

export type HandledCallback <Parameters> = (parameters: Parameters) => Promise<void> | void;

export interface HandledEvents <Parameters, Callback extends HandledCallback<Parameters>> {

    [event: string]: Callback;
}

export interface EventsUsed {

    [event: string]: {

        services: Array<ServiceBuilder>;
    
        commands: Array<ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder>;
    
        all: Array<ServiceBuilder | ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder>;
    };
}
