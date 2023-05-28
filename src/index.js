import path from 'node:path';

import { exec } from 'node:child_process';

import { Session } from '@biscuitland/core';

import getUsedFiles from './utils/getUsedFiles.js';
import getUsedEvents from './utils/getUsedEvents.js';
import getUsedIntents from './utils/getUsedIntents.js';

import EventBuilder from './builders/EventBuilder.js';
import ServiceBuilder from './builders/ServiceBuilder.js';
import ChatInputCommandBuilder from './builders/ChatInputCommandBuilder.js';
import UserContextMenuCommandBuilder from './builders/UserContextMenuCommandBuilder.js';
import MessageContextMenuCommandBuilder from './builders/MessageContextMenuCommandBuilder.js';

switch (process.argv.at(2)) {

    case 'init':

        exec(`wget https://github.com/yotrd/template/archive/refs/heads/main.zip -O .template.zip; tar -xf .template.zip; rm .template.zip; mv template-main ${ process.argv.at(3) ?? 'new-yotrd-project' }`);

        break;

    case 'deploy':

        const config = await import(`file:///${ process.argv.at(3) ?? path.join(process.cwd(), '.yotrd.config.js') }`);

        const eventsPath                     = config.default.directories?.events            ?? path.join(process.cwd(), 'src', 'events');
        const servicesPath                   = config.default.directories?.services          ?? path.join(process.cwd(), 'src', 'services');
        const chatInputCommandsPath          = config.default.directories?.commands?.chat    ?? path.join(process.cwd(), 'src', 'commands', 'chat');
        const userContextMenuCommandsPath    = config.default.directories?.commands?.user    ?? path.join(process.cwd(), 'src', 'commands', 'user');
        const messageContextMenuCommandsPath = config.default.directories?.commands?.message ?? path.join(process.cwd(), 'src', 'commands', 'message');

        const loadedEvents                     = await getUsedFiles(eventsPath, EventBuilder);
        const loadedServices                   = await getUsedFiles(servicesPath, ServiceBuilder);
        const loadedChatInputCommands          = await getUsedFiles(chatInputCommandsPath, ChatInputCommandBuilder);
        const loadedUserContextMenuCommands    = await getUsedFiles(userContextMenuCommandsPath, UserContextMenuCommandBuilder);
        const loadedMessageContextMenuCommands = await getUsedFiles(messageContextMenuCommandsPath, MessageContextMenuCommandBuilder);

        const usedEvents = getUsedEvents(

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands
        );

        const usedIntents = getUsedIntents(loadedEvents, usedEvents);

        for (const loadedEvent of loadedEvents) {

            // Ignora el evento si no fue utilizado
            if (!usedEvents[loadedEvent.name]) continue;

            loadedEvent.execute({

                session: new Session({

                    intents: usedIntents,

                    ...config.default.session?.({

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents
                    })
                }),

                config: config.default,

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
                usedIntents
            });
        };

        break;
};
