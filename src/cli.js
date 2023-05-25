import path from 'node:path';

import { exec } from 'node:child_process';

import { Client } from 'discord.js';

import loadFiles from './loadFiles.js';
import getUsedEvents from './getUsedEvents.js';
import getUsedIntents from './getUsedIntents.js';
import getUsedPartials from './getUsedPartials.js';

import EventBuilder from './builders/EventBuilder.js';
import ServiceBuilder from './builders/ServiceBuilder.js';
import ChatInputCommandBuilder from './builders/ChatInputCommandBuilder.js';
import UserContextMenuCommandBuilder from './builders/UserContextMenuCommandBuilder.js';
import MessageContextMenuCommandBuilder from './builders/MessageContextMenuCommandBuilder.js';

switch (process.argv.at(2)) {

    case 'init':

        exec('git clone https://github.com/yotrd/example.git new-yotrd-project');

        console.log('Read the documentation on https://github.com/yotrd/cli');

        break;

    case 'deploy':

        const config = (await import(`file:///${ path.join(process.cwd(), '.yotrd.config.js') }`)).default;

        const eventsPath                     = config.directories?.events            ?? path.join(process.cwd(), 'src', 'events');
        const servicesPath                   = config.directories?.services          ?? path.join(process.cwd(), 'src', 'services');
        const chatInputCommandsPath          = config.directories?.commands?.chat    ?? path.join(process.cwd(), 'src', 'commands', 'chat');
        const userContextMenuCommandsPath    = config.directories?.commands?.user    ?? path.join(process.cwd(), 'src', 'commands', 'user');
        const messageContextMenuCommandsPath = config.directories?.commands?.message ?? path.join(process.cwd(), 'src', 'commands', 'message');

        const loadedEvents                     = await loadFiles(eventsPath, EventBuilder);
        const loadedServices                   = await loadFiles(servicesPath, ServiceBuilder);
        const loadedChatInputCommands          = await loadFiles(chatInputCommandsPath, ChatInputCommandBuilder);
        const loadedUserContextMenuCommands    = await loadFiles(userContextMenuCommandsPath, UserContextMenuCommandBuilder);
        const loadedMessageContextMenuCommands = await loadFiles(messageContextMenuCommandsPath, MessageContextMenuCommandBuilder);

        const usedEvents = getUsedEvents(

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands
        );

        const usedIntents  = getUsedIntents(loadedEvents, usedEvents);
        const usedPartials = getUsedPartials(loadedEvents, usedEvents);

        const client = new Client({

            intents:  usedIntents,
            partials: usedPartials,

            ...config.client
        });

        for (const loadedEvent of loadedEvents) {

            // Ignora el evento si no fue utilizado
            if (!usedEvents[loadedEvent.name]) continue;

            loadedEvent.execute({

                config, client,

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

        break;
};
