import fs from 'node:fs/promises';
import path from 'node:path';

import { Session } from '@biscuitland/core';

import loadConfig from './loadConfig.js';
import loadSources from './loadSources.js';
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

        await Promise.all([

            fs.mkdir(path.join(process.cwd(), folder, 'src', 'events')),
            fs.mkdir(path.join(process.cwd(), folder, 'src', 'services')),
            fs.mkdir(path.join(process.cwd(), folder, 'src', 'commands'))
        ]);

        await Promise.all([

            fs.mkdir(path.join(process.cwd(), folder, 'src', 'commands', 'chat')),
            fs.mkdir(path.join(process.cwd(), folder, 'src', 'commands', 'user')),
            fs.mkdir(path.join(process.cwd(), folder, 'src', 'commands', 'message'))
        ]);

        await fs.writeFile(path.join(process.cwd(), folder, '.ydf.config.js'), 'export default { session ({ usedIntents }) { return { intents: usedIntents, token: \'BOT TOKEN\' } } };\n');

        break;
    }

    case 'deploy': {

        const config = await loadConfig(path.resolve(process.argv.at(3) ?? '.'));

        const loadedEvents                     = await loadSources(config.directories.events,           EventBuilder);
        const loadedServices                   = await loadSources(config.directories.services,         ServiceBuilder);
        const loadedChatInputCommands          = await loadSources(config.directories.commands.chat,    ChatInputCommandBuilder);
        const loadedUserContextMenuCommands    = await loadSources(config.directories.commands.user,    UserContextMenuCommandBuilder);
        const loadedMessageContextMenuCommands = await loadSources(config.directories.commands.message, MessageContextMenuCommandBuilder);

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

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents
                    })
                ),

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
