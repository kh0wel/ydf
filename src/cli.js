import fs from 'node:fs/promises';
import path from 'node:path';

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

        console.log('Repository on https://github.com/kh0wel/yotrd');

        break;

    case 'init':

        await Promise.all([

            fs.mkdir(path.join(process.cwd(), (process.argv.at(3) ?? 'new-yotrd-project'), 'src', 'events'),              { recursive: true }),
            fs.mkdir(path.join(process.cwd(), (process.argv.at(3) ?? 'new-yotrd-project'), 'src', 'services'),            { recursive: true }),
            fs.mkdir(path.join(process.cwd(), (process.argv.at(3) ?? 'new-yotrd-project'), 'src', 'commands', 'chat'),    { recursive: true }),
            fs.mkdir(path.join(process.cwd(), (process.argv.at(3) ?? 'new-yotrd-project'), 'src', 'commands', 'user'),    { recursive: true }),
            fs.mkdir(path.join(process.cwd(), (process.argv.at(3) ?? 'new-yotrd-project'), 'src', 'commands', 'message'), { recursive: true })
        ]);

        fs.writeFile(path.join(process.cwd(), (process.argv.at(3) ?? 'new-yotrd-project'), '.yotrd.config.js'), 'export default { session () { return { token: \'BOT TOKEN\' } } } };\n');

        break;

    case 'deploy':

        const { default: config } = await import(`file:///${ path.resolve(process.argv.at(3) ?? ('.', '.yotrd.config.js')) }`);

        const eventsPath                     = path.resolve(config.directories?.events            ?? ('.', 'src', 'events'));
        const servicesPath                   = path.resolve(config.directories?.services          ?? ('.', 'src', 'services'));
        const chatInputCommandsPath          = path.resolve(config.directories?.commands?.chat    ?? ('.', 'src', 'commands', 'chat'));
        const userContextMenuCommandsPath    = path.resolve(config.directories?.commands?.user    ?? ('.', 'src', 'commands', 'user'));
        const messageContextMenuCommandsPath = path.resolve(config.directories?.commands?.message ?? ('.', 'src', 'commands', 'message'));

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
