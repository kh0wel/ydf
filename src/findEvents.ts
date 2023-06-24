import { EventBuilder } from './struc/Event.js';
import { ServiceBuilder } from './struc/Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './struc/Command.js';
import { EventsGroup, GroupedCommand, GroupedService, GroupedAll } from './struc/Util.js';

export default function (

    loadedEvents:                     EventBuilder[],
    loadedServices:                   ServiceBuilder[],
    loadedChatInputCommands:          ChatInputCommandBuilder[],
    loadedMessageContextMenuCommands: UserContextMenuCommandBuilder[],
    loadedUserContextMenuCommands:    MessageContextMenuCommandBuilder[]
) {

    const groupedEvents: EventsGroup = {};

    for (const loadedEvent of loadedEvents) {

        const byServices: GroupedService[] = loadedServices.filter((serv) => serv.events[loadedEvent.name]);

        const byCommands: GroupedCommand[] = [

            ... loadedChatInputCommands,
            ... loadedUserContextMenuCommands,
            ... loadedMessageContextMenuCommands
        ]
            .filter((comm) => comm.events[loadedEvent.name]);

        const byAll: GroupedAll[] = [

            ... byServices,
            ... byCommands
        ];

        if (!byAll.length) continue;

        groupedEvents[loadedEvent.name] = {

            services: byServices,
            commands: byCommands,
            all:      byAll
        };
    }

    return groupedEvents;
}
