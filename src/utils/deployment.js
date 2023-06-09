import { Session } from '@biscuitland/core';

export default function (configuration, {

    loadedEvents,
    loadedServices,
    loadedChatInputCommands,
    loadedMessageContextMenuCommands,
    loadedUserContextMenuCommands,
}, usedEvents, { usedIntents }) {

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
