import { ConfigBuilder } from './Config.js';
import { EventBuilder } from './Event.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';

export interface SharedParameters {

    config: ConfigBuilder;

    client: ReturnType<ClientCallback>;

    loadedEvents:                     EventBuilder[];
    loadedServices:                   ServiceBuilder[];
    loadedChatInputCommands:          ChatInputCommandBuilder[];
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[];
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[];

    usedEvents: EventsUsed;

    usedIntents:  number;
    usedPartials: number[];
}

export type DeployCallback = (parameters: SharedParameters) => Promise<void> | void;

export type ClientCallback = (parameters: Omit<SharedParameters, 'bot'>) => Promise<any> | any;

export interface HandledEvents  {

    [event: string]: (parameters: any) => Promise<any> | any;
}

export interface EventsUsed {

    [event: string]: {

        services: Array<ServiceBuilder>;
    
        commands: Array<ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder>;
    
        all: Array<ServiceBuilder | ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder>;
    };
}
