import { EventBuilder } from './struc/Event.js';
import { ServiceBuilder } from './struc/Service.js';
import { ChatInputCommandBuilder } from './struc/ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from './struc/UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from './struc/MessageContextMenuCommand.js';

import { UsedEvents } from './struc/inter/Util.js';

export default function (

    loadedEvents:                     EventBuilder[],
    loadedServices:                   ServiceBuilder[],
    loadedChatInputCommands:          ChatInputCommandBuilder[],
    loadedMessageContextMenuCommands: UserContextMenuCommandBuilder[],
    loadedUserContextMenuCommands:    MessageContextMenuCommandBuilder[]
) {

    const usedEvents: UsedEvents = {};

    for (const loadedEvent of loadedEvents) {

        const byServices = loadedServices.filter((data) => data.events[loadedEvent.name]);

        const byCommands = [
            
            ... loadedChatInputCommands,
            ... loadedUserContextMenuCommands,
            ... loadedMessageContextMenuCommands
        ]
            .filter((data) => data.events[loadedEvent.name]);

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
