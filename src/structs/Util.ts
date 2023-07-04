import { ConfigBuilder } from './Config.js';
import { EventBuilder } from './Event.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './Command.js';

export interface CallbackParameters {

    loadedEvents:                     EventBuilder[];
    loadedServices:                   ServiceBuilder[];
    loadedChatInputCommands:          ChatInputCommandBuilder[];
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[];
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[];

    usedEvents: EventsUsed;

    usedIntents:  number;
    usedPartials: number[];
}

export interface EventCallbackParameters extends CallbackParameters {

    config: ConfigBuilder;

    bot: any;
}

export type EventCallback = HandledCallback<EventCallbackParameters>;

export interface DeployCallbackParameters extends CallbackParameters {

    config: ConfigBuilder;

    bot: any;
}

export type DeployCallback = HandledCallback<DeployCallbackParameters>;

export interface BotCallbackParameters extends CallbackParameters {

    config: ConfigBuilder;
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
