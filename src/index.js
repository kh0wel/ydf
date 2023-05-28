import readline from 'node:readline/promises';
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

        const cli = readline.createInterface({

            input:  process.stdin,
            output: process.stdout,
        });

        await cli.question('Project name: (new-yotrd-project) ')

            .then((name) => {

                cli.close();

                name ||= 'new-yotrd-project';

                switch (process.platform) {

                    case 'win32':

                        exec(`git clone --depth=1 https://github.com/yotrd/template.git ${ name } && rmdir -Force ${ path.join(process.cwd(), name, '.git') }`);

                        break;

                    default: 

                        exec(`git clone --depth=1 https://github.com/yotrd/template.git ${ name } && rmdir -rf ${ path.join(process.cwd(), name, '.git') }`);

                        break;
                };
            });

        break;

    case 'deploy':

        const config = (await import(`file:///${ path.join(process.cwd(), '.yotrd.config.js') }`)).default;

        const eventsPath                     = config.directories?.events            ?? path.join(process.cwd(), 'src', 'events');
        const servicesPath                   = config.directories?.services          ?? path.join(process.cwd(), 'src', 'services');
        const chatInputCommandsPath          = config.directories?.commands?.chat    ?? path.join(process.cwd(), 'src', 'commands', 'chat');
        const userContextMenuCommandsPath    = config.directories?.commands?.user    ?? path.join(process.cwd(), 'src', 'commands', 'user');
        const messageContextMenuCommandsPath = config.directories?.commands?.message ?? path.join(process.cwd(), 'src', 'commands', 'message');
    
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
