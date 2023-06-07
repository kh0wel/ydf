import fs from 'node:fs/promises';
import path from 'node:path';

import { Session } from '@biscuitland/core';

import loadFiles from '../loadFiles.js';
import findUsedEvents from '../findUsedEvents.js';
import findUsedIntents from '../findUsedIntents.js';

switch (process.argv.at(2)) {

    case 'init': {

        const folder = process.argv.at(3) ?? 'new-ydf-project';

        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'events'),   { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'services'), { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'commands'), { recursive: true });

        await fs.writeFile(path.join(process.cwd(), folder, '.ydf.config.js'), 'export default { session ({ usedIntents }) { return { intents: usedIntents, token: \'BOT TOKEN\' }; } };\n');

        break;
    }

    case 'deploy': {

        const { default: config } = await import(`file:///${ path.resolve(process.argv.at(3) ?? '.ydf.config.js') }`);

        const loadedEvents                      = await loadFiles(path.resolve(config.directories?.events            ?? 'src/events'),   config.files?.events            ?? '.event.');
        const loadedServices                    = await loadFiles(path.resolve(config.directories?.services          ?? 'src/services'), config.files?.services          ?? '.service.');
        const loadedChatInputCommands           = await loadFiles(path.resolve(config.directories?.commands?.chat    ?? 'src/commands'), config.files?.commands?.chat    ?? '.command.chat.');
        const loadedUserContextMenuCommands     = await loadFiles(path.resolve(config.directories?.commands?.user    ?? 'src/commands'), config.files?.commands?.user    ?? '.command.user.');
        const loadedMessageContextMenuCommands  = await loadFiles(path.resolve(config.directories?.commands?.message ?? 'src/commands'), config.files?.commands?.message ?? '.command.message.');

        const usedEvents = findUsedEvents(

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedMessageContextMenuCommands,
            loadedUserContextMenuCommands
        );

        const usedIntents = findUsedIntents(loadedEvents, usedEvents);

        for (const loadedEvent of loadedEvents) {

            if (!usedEvents[loadedEvent.name]) continue;

            loadedEvent.execute({

                config,

                loadedEvents,
                loadedServices,
                loadedChatInputCommands,
                loadedMessageContextMenuCommands,
                loadedUserContextMenuCommands,

                usedEvents,
                usedIntents,

                session: new Session(

                    config.session({

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedMessageContextMenuCommands,
                        loadedUserContextMenuCommands,

                        usedEvents,
                        usedIntents,
                    })
                )
            });
        }

        break;
    }

    default:

        console.log('Repository on https://github.com/kh0wel/ydf');

        break;
}
