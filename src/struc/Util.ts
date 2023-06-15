import { SettingsBuilder } from './Settings.js';

export type DefaultEventParameters = {

    settings: SettingsBuilder,

    loadedEvents,
    loadedServices,
    loadedChatInputCommands,
    loadedMessageContextMenuCommands,
    loadedUserContextMenuCommands,

    usedEvents,
    usedIntents
}

export type DefaultEventFunction = (parameters: DefaultEventParameters) => Promise<void> | void;

export type EventsGroup = {

    services: ServiceBuilder[],

    commands: (ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder)[]

    all: (ServiceBuilder | ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder)[]
}
