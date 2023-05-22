import path from 'node:path';

import { Client } from 'discord.js';

import groupEvents from './groupers/groupEvents.js';
import groupIntents from './groupers/groupIntents.js';
import groupPartials from './groupers/groupPartials.js';

import loadFiles from './utils/loadFiles.js';

import EventBuilder from './builders/EventBuilder.js';
import ServiceBuilder from './builders/ServiceBuilder.js';
import ChatInputCommandBuilder from './builders/ChatInputCommandBuilder.js';
import UserContextMenuCommandBuilder from './builders/UserContextMenuCommandBuilder.js';
import MessageContextMenuCommandBuilder from './builders/MessageContextMenuCommandBuilder.js';

export default async function (options) {

    const eventsPath                     = options.directories?.events            ?? path.join(process.cwd(), 'src', 'events');
    const servicesPath                   = options.directories?.services          ?? path.join(process.cwd(), 'src', 'services');
    const chatInputCommandsPath          = options.directories?.commands?.chat    ?? path.join(process.cwd(), 'src', 'commands', 'chat');
    const userContextMenuCommandsPath    = options.directories?.commands?.user    ?? path.join(process.cwd(), 'src', 'commands', 'user');
    const messageContextMenuCommandsPath = options.directories?.commands?.message ?? path.join(process.cwd(), 'src', 'commands', 'message');

    const loadedEvents                     = await loadFiles(eventsPath,                     [ 'main.js', 'main.ts' ], EventBuilder);
    const loadedServices                   = await loadFiles(servicesPath,                   [ 'main.js', 'main.ts' ], ServiceBuilder);
    const loadedChatInputCommands          = await loadFiles(chatInputCommandsPath,          [ 'main.js', 'main.ts' ], ChatInputCommandBuilder);
    const loadedUserContextMenuCommands    = await loadFiles(userContextMenuCommandsPath,    [ 'main.js', 'main.ts' ], UserContextMenuCommandBuilder);
    const loadedMessageContextMenuCommands = await loadFiles(messageContextMenuCommandsPath, [ 'main.js', 'main.ts' ], MessageContextMenuCommandBuilder);

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
