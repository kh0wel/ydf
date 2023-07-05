import { EventsUsed } from './structs/Util.js';
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

    const usedEvents: EventsUsed = {};

    for (const loadedEvent of loadedEvents) {

        const byServices = loadedServices.filter((serv) => serv.events[loadedEvent.name]);

        const byCommands = [ ... loadedChatInputCommands, ... loadedUserContextMenuCommands, ... loadedMessageContextMenuCommands ].filter((comm) => comm.events[loadedEvent.name]);

        const byAll = [ ... byServices, ... byCommands ];

        if (!byAll.length) continue;

        usedEvents[loadedEvent.name] = {

            services: byServices,
            commands: byCommands,
            all:      byAll
        };
    }

    return usedEvents;
}
