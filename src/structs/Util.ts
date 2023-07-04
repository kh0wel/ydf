import { ConfigBuilder } from './Config.js';
import { EventBuilder } from './Event.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';

export interface HandledEventCallbackParameters {

    config: ConfigBuilder;

    bot: any;

    loadedEvents:                     EventBuilder[];
    loadedServices:                   ServiceBuilder[];
    loadedChatInputCommands:          ChatInputCommandBuilder[];
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[];
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[];

    usedEvents: EventsUsed;

    usedIntents:  number;
    usedPartials: number[];
}

export type HandledEventCallback = HandledCallback<HandledEventCallbackParameters>;

export interface DeployCallbackParameters {

    config: ConfigBuilder;

    bot: any;

    loadedEvents:                     EventBuilder[];
    loadedServices:                   ServiceBuilder[];
    loadedChatInputCommands:          ChatInputCommandBuilder[];
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[];
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[];

    usedEvents: EventsUsed;

    usedIntents:  number;
    usedPartials: number[];
}

export type DeployCallback = HandledCallback<DeployCallbackParameters>;

export interface BotCallbackParameters {

    loadedEvents:                     EventBuilder[];
    loadedServices:                   ServiceBuilder[];
    loadedChatInputCommands:          ChatInputCommandBuilder[];
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[];
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[];

    usedEvents: EventsUsed;

    usedIntents:  number;
    usedPartials: number[];
}

export type BotCallback = HandledCallback<BotCallbackParameters>;

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
