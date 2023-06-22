import { EventBuilder } from './structs/Event.js';
import { ServiceBuilder } from './structs/Service.js';
import { ChatInputCommandBuilder } from './structs/ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from './structs/UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from './structs/MessageContextMenuCommand.js';

import {
    
    EventsGroup,
    GroupedCommand,
    GroupedService,
    GroupedAll
} from './structs/Util.js';

export default function (

    loadedEvents:                     EventBuilder[],
    loadedServices:                   ServiceBuilder[],
    loadedChatInputCommands:          ChatInputCommandBuilder[],
    loadedMessageContextMenuCommands: UserContextMenuCommandBuilder[],
    loadedUserContextMenuCommands:    MessageContextMenuCommandBuilder[]
) {

    const usedEvents: EventsGroup = {};

    for (const loadedEvent of loadedEvents) {

        const byServices: GroupedService[] = loadedServices.filter((data) => data.events[loadedEvent.name]);

        const byCommands: GroupedCommand[] = [

            ... loadedChatInputCommands,
            ... loadedUserContextMenuCommands,
            ... loadedMessageContextMenuCommands
        ]
            .filter((data) => data.events[loadedEvent.name]);

        const byAll: GroupedAll[] = [ ... byServices, ... byCommands ];

        if (!byAll.length) continue;

        usedEvents[loadedEvent.name] = {

            services: byServices,
            commands: byCommands,
            all:      byAll
        };
    }

    return usedEvents;
}
