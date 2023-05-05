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

    if (options?.loaders?.events                     && typeof options.loaders.events           !== 'function') throw new Error('Invalid events loader');
    if (options?.loaders?.services                   && typeof options.loaders.services         !== 'function') throw new Error('Invalid services loader');
    if (options?.loaders?.chatInputCommands          && typeof options.loaders.commands.chat    !== 'function') throw new Error('Invalid chat input commands loader');
    if (options?.loaders?.userContextMenuCommands    && typeof options.loaders.commands.user    !== 'function') throw new Error('Invalid user context menu commands loader');
    if (options?.loaders?.messageContextMenuCommands && typeof options.loaders.commands.message !== 'function') throw new Error('Invalid message context menu commands loader');

    if (options?.groupers?.events   && typeof options.groupers.events   !== 'function') throw new Error('Invalid events grouper');
    if (options?.groupers?.intents  && typeof options.groupers.intents  !== 'function') throw new Error('Invalid intents grouper');
    if (options?.groupers?.partials && typeof options.groupers.partials !== 'function') throw new Error('Invalid partials grouper');

    const loadedEvents                     = await (options?.loaders?.events                     ?? loadEvents)(eventsPath);
    const loadedServices                   = await (options?.loaders?.services                   ?? loadServices)(servicesPath);
    const loadedChatInputCommands          = await (options?.loaders?.chatInputCommands          ?? loadChatInputCommands)(chatInputCommandsPath);
    const loadedUserContextMenuCommands    = await (options?.loaders?.userContextMenuCommands    ?? loadUserContextMenuCommands)(userContextMenuCommandsPath);
    const loadedMessageContextMenuCommands = await (options?.loaders?.messageContextMenuCommands ?? loadMessageContextMenuCommands)(messageContextMenuCommandsPath);

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
