import path from 'node:path';

import { Client } from 'discord.js';

// import loadLayouts from './loaders/loadLayouts.js';
import loadEvents from './loaders/loadEvents.js';
import loadServices from './loaders/loadServices.js';
import loadChatInputCommands from './loaders/loadChatInputCommands.js';
import loadUserContextMenuCommands from './loaders/loadUserContextMenuCommands.js';
import loadMessageContextMenuCommands from './loaders/loadMessageContextMenuCommands.js';

import groupEvents from './groupers/groupEvents.js';
import groupIntents from './groupers/groupIntents.js';
import groupPartials from './groupers/groupPartials.js';

export default async function (options) {

    // const layoutsPath                    = options.directories?.layouts           ?? path.resolve(process.cwd(), 'src', 'layouts');
    const eventsPath                     = options.directories?.events            ?? path.resolve(process.cwd(), 'src', 'events');
    const servicesPath                   = options.directories?.services          ?? path.resolve(process.cwd(), 'src', 'services');
    const chatInputCommandsPath          = options.directories?.commands?.chat    ?? path.resolve(process.cwd(), 'src', 'commands', 'chat');
    const userContextMenuCommandsPath    = options.directories?.commands?.user    ?? path.resolve(process.cwd(), 'src', 'commands', 'user');
    const messageContextMenuCommandsPath = options.directories?.commands?.message ?? path.resolve(process.cwd(), 'src', 'commands', 'message');

    // const loadedLayouts                    = await loadLayouts(layoutsPath);
    const loadedEvents                     = await loadEvents(eventsPath);
    const loadedServices                   = await loadServices(servicesPath);
    const loadedChatInputCommands          = await loadChatInputCommands(chatInputCommandsPath);
    const loadedUserContextMenuCommands    = await loadUserContextMenuCommands(userContextMenuCommandsPath);
    const loadedMessageContextMenuCommands = await loadMessageContextMenuCommands(messageContextMenuCommandsPath);

    const usedEvents = groupEvents(

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands
    );

    const usedIntents  = groupIntents(loadedEvents, usedEvents);
    const usedPartials = groupPartials(loadedEvents, usedEvents);

    const client = new Client({

        intents:  usedIntents,
        partials: usedPartials,

        ...options.client
    });

    for (const loadedEvent of loadedEvents) {

        // Ignora el evento si no fue utilizado
        if (!usedEvents[loadedEvent.name]) continue;

        loadedEvent.execute({

            // layout (name, options) {

            //     return { ...loadedLayouts.find((layout) => layout.name === name).template.data, ...options };
            // },

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
};
