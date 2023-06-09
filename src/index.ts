import { Session } from '@biscuitland/core';

import loadFiles from './loadFiles.js';
import findUsedEvents from './findUsedEvents.js';
import findUsedGateways from './findUsedGateways.js';

import { SettingsOptions } from './structures/Settings.js';

export * from './structures/Settings.js';
export * from './structures/Event.js';
export * from './structures/Service.js';
export * from './structures/ChatInputCommand.js';
export * from './structures/UserContextMenuCommand.js';
export * from './structures/MessageContextMenuCommand.js';

export default async function (settings: Required<SettingsOptions>) {

    const {

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands
    } = await loadFiles(settings.include, settings.exclude);

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

            settings,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedMessageContextMenuCommands,
            loadedUserContextMenuCommands,

            usedEvents,
            usedIntents,

            session: new Session(

                settings.session({

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
