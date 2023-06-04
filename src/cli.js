import fs from 'node:fs/promises';
import path from 'node:path';

import { Session } from '@biscuitland/core';

import loadFiles from './loadFiles.js';
import findUsedEvents from './findUsedEvents.js';
import findUsedGateways from './findUsedGateways.js';

switch (process.argv.at(2)) {

    case 'init': {

        const folder = process.argv.at(3) ?? 'new-ydf-project';

        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'events'),   { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'services'), { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'commands'), { recursive: true });

        await fs.writeFile(path.join(process.cwd(), folder, '.ydf.config.js'), 'export default { session ({ usedIntents }) { return { intents: usedIntents, token: \'BOT TOKEN\' } } };\n');

        break;
    }

    case 'deploy': {

        const { default: config } = await import(`file:///${ process.argv.at(3) ? path.resolve(process.argv.at(3)) : path.join(process.cwd(), '.ydf.config.js') }`);

        const {

            laodedEvents,
            laodedServices,
            laodedChatInputCommands,
            loadedMessageContextMenuCommands,
            loadedUserContextMenuCommands
        }
            = await loadFiles(config);

        const usedEvents = findUsedEvents(

            laodedEvents,
            laodedServices,
            laodedChatInputCommands,
            loadedMessageContextMenuCommands,
            loadedUserContextMenuCommands
        );

        const { usedIntents } = findUsedGateways(laodedEvents, usedEvents);

        for (const loadedEvent of laodedEvents) {

            if (!usedEvents[loadedEvent.name]) continue;

            loadedEvent.execute({

                config,

                laodedEvents,
                laodedServices,
                laodedChatInputCommands,
                loadedMessageContextMenuCommands,
                loadedUserContextMenuCommands,

                usedEvents,
                usedIntents,

                session: new Session(
                    
                    config.session({
        
                        laodedEvents,
                        laodedServices,
                        laodedChatInputCommands,
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
