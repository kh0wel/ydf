export type EventsGroup = {

    services: ServiceBuilder[],

    commands: (ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder)[]

    all: (ServiceBuilder | ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder)[]
}
