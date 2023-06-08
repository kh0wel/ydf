import fs from 'node:fs/promises';
import path from 'node:path';

import { Session } from '@biscuitland/core';

import loadFiles from '../loadFiles.js';
import findUsedEvents from '../findUsedEvents.js';
import findUsedGateways from '../findUsedGateways.js';

switch (process.argv.at(2)) {

    case 'init': {

        const folder = process.argv.at(3) ?? 'new-ydf-project';

        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'events'),   { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'services'), { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'commands'), { recursive: true });

        await fs.writeFile(path.join(process.cwd(), folder, '.ydf.config.js'), 'import { ConfigBuilder } from \'ydf\';\n\nexport default new ConfigBuilder ({\n\n\tsession ({ usedIntents, usedPartials }) {\n\n\t\treturn { intents: usedIntents, partials: usedPartials, token: \'BOT TOKEN\' };\n\t}\n});\n');

        break;
    }

    case 'deploy': {

        const { default: config } = await import(`file:///${ path.resolve(process.argv.at(3) ?? '.ydf.config.js') }`);

        const {

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands
        }
            = await loadFiles(config.include, config.exclude);

        const usedEvents = findUsedEvents(

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedMessageContextMenuCommands,
            loadedUserContextMenuCommands
        );

        const { usedIntents } = findUsedGateways(loadedEvents, usedEvents);

        for (const loadedEvent of loadedEvents) {

            if (!usedEvents[loadedEvent.metadata.name]) continue;

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
                        usedIntents
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
