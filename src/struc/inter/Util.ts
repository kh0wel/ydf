export type EventsHandled = {

    [event: string]: (parameters) => Promise<void> | void;
}

export interface ExecuteParameters {

    settings: string;

    loadedEvents:                     [],
    loadedServices:                   [],
    loadedChatInputCommands:          [],
    loadedUserContextMenuCommands:    [],
    loadedMessageContextMenuCommands: [],

    usedEvents: {},

    usedIntents: number
}

export type ExecuteProperty = (parameters: ExecuteParameters) => Promise<void> | void; 

export type UsedEvents = {

    [event: string]: {

        services: ServiceBuilder[],

        commands: (ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder)[]

        all: (ServiceBuilder | ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder)[]
    }
}
