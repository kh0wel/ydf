import { Session } from '@biscuitland/core';

import loadFiles from './loadFiles.js';
import findUsedEvents from './findUsedEvents.js';
import findUsedGateways from './findUsedGateways.js';

import { ConfigOptions } from './struc/Configuration.js';

export * from './struc/Configuration.js';
export * from './struc/Event.js';
export * from './struc/Service.js';
export * from './struc/ChatInputCommand.js';
export * from './struc/UserContextMenuCommand.js';
export * from './struc/MessageContextMenuCommand.js';

export default async function (config: Required<ConfigOptions>) {

    const {

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands
    } = await loadFiles(config);

    const usedEvents = findUsedEvents(

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands
    );

    const { usedIntents } = findUsedGateways(loadedEvents, usedEvents);

    for (const loadedEvent of loadedEvents) {

        if (!usedEvents[loadedEvent.metadata.name]) continue;

        loadedEvent.execute({

            config,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedMessageContextMenuCommands,
            loadedUserContextMenuCommands,

            usedEvents,
            usedIntents,

            session: new Session(

                config.session({

                    loadedEvents,
                    loadedServices,
                    loadedChatInputCommands,
                    loadedMessageContextMenuCommands,
                    loadedUserContextMenuCommands,

                    usedEvents,
                    usedIntents
                })
            )
        });
    }
}
