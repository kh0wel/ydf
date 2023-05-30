import { resolve } from 'node:path';

import { Session } from '@biscuitland/core';

import loadFiles from './utils/loadFiles.js';
import getUsedEvents from './utils/getUsedEvents.js';
import getUsedIntents from './utils/getUsedIntents.js';

import EventBuilder from './builders/EventBuilder.js';
import ServiceBuilder from './builders/ServiceBuilder.js';
import ChatInputCommandBuilder from './builders/ChatInputCommandBuilder.js';
import UserContextMenuCommandBuilder from './builders/UserContextMenuCommandBuilder.js';
import MessageContextMenuCommandBuilder from './builders/MessageContextMenuCommandBuilder.js';

switch (process.argv.at(2)) {

    default:

        console.log('yotrd deploy [<config-file-path>]');
        console.log();
        console.log('Repository on https://github.com/kh0wel/yotrd');

        break;

    case 'deploy':

        const { default: config } = await import(`file:///${ resolve(process.argv.at(3) ?? ('.', '.yotrd.config.js')) }`);

        const eventsPath                     = resolve(config.directories?.events            ?? ('.', 'src', 'events'));
        const servicesPath                   = resolve(config.directories?.services          ?? ('.', 'src', 'services'));
        const chatInputCommandsPath          = resolve(config.directories?.commands?.chat    ?? ('.', 'src', 'commands', 'chat'));
        const userContextMenuCommandsPath    = resolve(config.directories?.commands?.user    ?? ('.', 'src', 'commands', 'user'));
        const messageContextMenuCommandsPath = resolve(config.directories?.commands?.message ?? ('.', 'src', 'commands', 'message'));

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

        const usedIntents = getUsedIntents(loadedEvents, usedEvents);

        for (const loadedEvent of loadedEvents) {

            // Ignora el evento si no fue utilizado
            if (!usedEvents[loadedEvent.name]) continue;

            loadedEvent.execute({

                config,

                session: new Session({

                    intents: usedIntents,

                    ...config.session?.({

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents
                    })
                }),

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
