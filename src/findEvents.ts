import { EventBuilder } from './structs/Event.js';
import { ServiceBuilder } from './structs/Service.js';
import { ChatInputCommandBuilder } from './structs/ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from './structs/UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from './structs/MessageContextMenuCommand.js';

import { EventsGroup, GroupedAll, GroupedCommand, GroupedService, LoadedFile } from './structs/Util.js';

export default function (

    loadedEvents:                     LoadedFile<EventBuilder>[],
    loadedServices:                   LoadedFile<ServiceBuilder>[],
    loadedChatInputCommands:          LoadedFile<ChatInputCommandBuilder>[],
    loadedMessageContextMenuCommands: LoadedFile<UserContextMenuCommandBuilder>[],
    loadedUserContextMenuCommands:    LoadedFile<MessageContextMenuCommandBuilder>[]
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
