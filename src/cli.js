import fs from 'node:fs/promises';
import path from 'node:path';

import { Session } from '@biscuitland/core';

import loadSettings from './loadSettings.js';
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

        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'events'),              { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'services'),            { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'commands', 'chat'),    { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'commands', 'user'),    { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'commands', 'message'), { recursive: true });

        await fs.writeFile(path.join(process.cwd(), folder, '.ydfrc.js'), 'export default { session ({ usedIntents }) { return { intents: usedIntents, token: \'BOT TOKEN\' } } };\n');

        break;
    }

    case 'deploy': {

        const settings = await loadSettings(path.resolve(process.argv.at(3) ?? '.'));

        const loadedEvents                     = await loadSources(settings.directories.events,           settings.extensions.events,           EventBuilder);
        const loadedServices                   = await loadSources(settings.directories.services,         settings.extensions.services,         ServiceBuilder);
        const loadedChatInputCommands          = await loadSources(settings.directories.commands.chat,    settings.extensions.commands.chat,    ChatInputCommandBuilder);
        const loadedUserContextMenuCommands    = await loadSources(settings.directories.commands.user,    settings.extensions.commands.user,    UserContextMenuCommandBuilder);
        const loadedMessageContextMenuCommands = await loadSources(settings.directories.commands.message, settings.extensions.commands.message, MessageContextMenuCommandBuilder);

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

                settings,

                session: new Session(

                    settings.session({

                        settings,

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
