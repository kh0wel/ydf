import { Client } from 'discord.js';

import loadEvents from './loaders/loadEvents.js';
import loadServices from './loaders/loadServices.js';
import loadChatInputCommands from './loaders/loadChatInputCommands.js';
import loadUserContextMenuCommands from './loaders/loadUserContextMenuCommands.js';
import loadMessageContextMenuCommands from './loaders/loadMessageContextMenuCommands.js';

import groupEvents from './groupers/groupEvents.js';
import groupIntents from './groupers/groupIntents.js';
import groupPartials from './groupers/groupPartials.js';

export default async function ({

    options,

    eventsPath,
    servicesPath,
    chatInputCommandsPath,
    userContextMenuCommandsPath,
    messageContextMenuCommandsPath
}) {

    const loadedEvents                     = await loadEvents(eventsPath);
    const loadedServices                   = await loadServices(servicesPath);
    const loadedChatInputCommands          = await loadChatInputCommands(chatInputCommandsPath);
    const loadedUserContextMenuCommands    = await loadUserContextMenuCommands(userContextMenuCommandsPath);
    const loadedMessageContextMenuCommands = await loadMessageContextMenuCommands(messageContextMenuCommandsPath);

    const usedEvents = (options?.groupers?.events ?? groupEvents)({

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands
    });

    const usedIntents = (options?.groupers?.intents ?? groupIntents)({

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands,

        usedEvents
    });

    const usedPartials = (options?.groupers?.partials ?? groupPartials)({

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands,

        usedEvents
    });

    const client = new Client({

        intents: options?.intents?.force

            ? options.intents.bits

            : usedIntents.concat(options?.intents?.bits ?? []),

        partials: options?.partials?.force

            ? options.partials.bits

            : usedPartials.concat(options?.partials?.bits ?? []),

        ... options?.client
    });

    for (const loadedEvent of loadedEvents) {

        // Ignora el evento si no fue utilizado
        if (!usedEvents.has(loadedEvent.name)) continue;

        await loadedEvent.execute({

            options, client,
    
            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,
    
            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,
    
            usedEvents,
            usedIntents,
            usedPartials
        });
    };

    return {

        options, client,

        eventsPath,
        servicesPath,
        chatInputCommandsPath,
        userContextMenuCommandsPath,
        messageContextMenuCommandsPath,

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands,

        usedEvents,
        usedIntents,
        usedPartials
    };
};
