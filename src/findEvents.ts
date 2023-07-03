import { EventsGroup, GroupedCommand, GroupedService, GroupedAll } from './structs/Util.js';
import { EventBuilder } from './structs/Event.js';
import { ServiceBuilder } from './structs/Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './structs/Command.js';

export default function (

    loadedEvents:                     EventBuilder[],
    loadedServices:                   ServiceBuilder[],
    loadedChatInputCommands:          ChatInputCommandBuilder[],
    loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[],
    loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[]
) {

    const groupedEvents: EventsGroup = {};

    for (const loadedEvent of loadedEvents) {

        const byServices: GroupedService[] = loadedServices.filter((serv) => serv.events[loadedEvent.name]);

        const byCommands: GroupedCommand[] = [ ... loadedChatInputCommands, ... loadedUserContextMenuCommands, ... loadedMessageContextMenuCommands ].filter((comm) => comm.events[loadedEvent.name]);

        const byAll: GroupedAll[] = [ ... byServices, ... byCommands ];

        if (!byAll.length) continue;

        groupedEvents[loadedEvent.name] = {

            services: byServices,
            commands: byCommands,
            all:      byAll
        };
    }

    return groupedEvents;
}
