import { Session } from '@biscuitland/core';

import loadFiles from './loadFiles.js';
import findUsedEvents from './findUsedEvents.js';
import findUsedGateways from './findUsedGateways.js';

export * from './structures/Configuration.js';
export * from './structures/Event.js';
export * from './structures/Service.js';
export * from './structures/ChatInputCommand.js';
export * from './structures/UserContextMenuCommand.js';
export * from './structures/MessageContextMenuCommand.js';

export default async function (configuration) {

    const {

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands
    }
        = await loadFiles(configuration);

    const usedEvents = findUsedEvents(

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedMessageContextMenuCommands,
        loadedUserContextMenuCommands
    );

    const { usedIntents } = findUsedGateways(loadedEvents, usedEvents);

    for (const loadedEvent of loadedEvents) {

        if (!usedEvents[loadedEvent.metadata.name]) continue;

        loadedEvent.execute({

            configuration,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedMessageContextMenuCommands,
            loadedUserContextMenuCommands,

            usedEvents,
            usedIntents,

            session: new Session(

                configuration.session({

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
