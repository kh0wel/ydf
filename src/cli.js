import fs from 'node:fs/promises';
import path from 'node:path';

import { Session } from '@biscuitland/core';

import loadFiles from './loadFiles.js';
import findUsedEvents from './findUsedEvents.js';
import findUsedIntents from './findUsedIntents.js';

import { EventBuilder } from './structures/Event.js';
import { ServiceBuilder } from './structures/Service.js';
import { ChatInputCommandBuilder } from './structures/ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from './structures/UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from './structures/MessageContextMenuCommand.js';

switch (process.argv.at(2)) {

    case 'init': {

        const folder = process.argv.at(3) ?? 'new-ydf-project';

        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'events'),              { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'services'),            { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'commands', 'chat'),    { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'commands', 'user'),    { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'commands', 'message'), { recursive: true });

        await fs.writeFile(path.join(process.cwd(), folder, '.ydfrc.js'), 'export default { session ({ usedIntents }) { return { intents: usedIntents, token: \'BOT TOKEN\' } } };\n');

        break;
    }

    case 'deploy': {

        const { default: config } = await import(`file:///${ process.argv.at(3) ? path.resolve(process.argv.at(3)) : path.join(process.cwd(), '.ydf.config.js') }`);

        const eventsPath                     = config.directories?.events            ? path.resolve(config.directories.events)           : path.join(process.cwd(), 'src', 'events');
        const servicesPath                   = config.directories?.services          ? path.resolve(config.directories.services)         : path.join(process.cwd(), 'src', 'services');
        const chatInputCommandsPath          = config.directories?.commands?.chat    ? path.resolve(config.directories.commands.chat)    : path.join(process.cwd(), 'src', 'commands', 'chat');
        const userContextMenuCommandsPath    = config.directories?.commands?.user    ? path.resolve(config.directories.commands.user)    : path.join(process.cwd(), 'src', 'commands', 'user');
        const messageContextMenuCommnadsPath = config.directories?.commands?.message ? path.resolve(config.directories.commands.message) : path.join(process.cwd(), 'src', 'commands', 'message');

        const loadedEvents                     = await loadFiles(eventsPath,                     '.event.js',           EventBuilder);
        const loadedServices                   = await loadFiles(servicesPath,                   '.service.js',         ServiceBuilder);
        const loadedChatInputCommands          = await loadFiles(chatInputCommandsPath,          '.command.chat.js',    ChatInputCommandBuilder);
        const loadedUserContextMenuCommands    = await loadFiles(userContextMenuCommandsPath,    '.command.user.js',    UserContextMenuCommandBuilder);
        const loadedMessageContextMenuCommands = await loadFiles(messageContextMenuCommnadsPath, '.command.message.js', MessageContextMenuCommandBuilder);

        const usedEvents = findUsedEvents(

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands
        );

        const usedIntents = findUsedIntents(loadedEvents, usedEvents);

        for (const loadedEvent of loadedEvents) {

            if (!usedEvents[loadedEvent.name]) continue;

            loadedEvent.execute({

                config,

                session: new Session(

                    config.session({

                        config,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommnadsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents
                    })
                ),

                eventsPath,
                servicesPath,
                chatInputCommandsPath,
                userContextMenuCommandsPath,
                messageContextMenuCommnadsPath,

                loadedEvents,
                loadedServices,
                loadedChatInputCommands,
                loadedUserContextMenuCommands,
                loadedMessageContextMenuCommands,

                usedEvents,
                usedIntents
            });
        }

        break;
    }

    default:

        console.log('Repository on https://github.com/kh0wel/ydf');

        break;
}
