import path from 'node:path';

import { Client } from 'discord.js';

import {

    loadEvents,
    loadServices,
    loadChatInputCommands,
    loadUserContextMenuCommands,
    loadMessageContextMenuCommands,

    groupEvents,
    groupIntents,
    groupPartials
} from 'nard';

const eventsPath                     = path.resolve(process.cwd(), 'src', 'events');
const servicesPath                   = path.resolve(process.cwd(), 'src', 'services');
const chatInputCommandsPath          = path.resolve(process.cwd(), 'src', 'commands', 'chat');
const userContextMenuCommandsPath    = path.resolve(process.cwd(), 'src', 'commands', 'user');
const messageContextMenuCommandsPath = path.resolve(process.cwd(), 'src', 'commands', 'message');

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
    loadedMessageContextMenuCommands,
);

const usedIntents  = groupIntents(loadedEvents, usedEvents);
const usedPartials = groupPartials(loadedEvents, usedEvents);

const client = new Client({

    intents:  usedIntents,
    partials: usedPartials
});

for (const loadedEvent of loadedEvents) {

    // Ignora el evento si no fue utilizado
    if (!usedEvents.has(loadedEvent.name)) continue;

    loadedEvent.execute({

        client,

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

client
    .login('YOU BOT TOKEN')
    .then(() => console.log('Bot connected'));
