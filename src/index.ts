import loadFiles from './loadFiles.js';
import findEvents from './findEvents.js';
import findGateways from './findGateways.js';

import { ConfigurationBuilder } from './struc/Configuration.js';

export default async function (config: ConfigurationBuilder) {

    const {

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands
    } = await loadFiles(config);

    const usedEvents = findEvents(

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands
    );

    return {

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands,

        usedEvents,

        ... findGateways(loadedEvents, usedEvents),

        deploy (parameters) {

            for (const loadedEvent of loadedEvents) {

                if (!usedEvents[loadedEvent.name]) continue;

                loadedEvent.execute(parameters);
            }
        }
    }
}

export * from './struc/Configuration.js';
export * from './struc/Event.js';
export * from './struc/Service.js';
export * from './struc/ChatInputCommand.js';
export * from './struc/UserContextMenuCommand.js';
export * from './struc/MessageContextMenuCommand.js';
