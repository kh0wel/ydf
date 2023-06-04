import fs from 'node:fs/promises';
import path from 'node:path';

import { Session } from '@biscuitland/core';

import loadFiles from './loadFiles.js';
import findUsedEvents from './findUsedEvents.js';
import findUsedGateways from './findUsedGateways.js';

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

        const loadedFiles = await loadFiles(config);

        const usedEvents   = findUsedEvents(loadedFiles);
        const usedGateways = findUsedGateways(loadedFiles, usedEvents);

        for (const loadedEvent of loadedFiles.events) {

            if (!usedEvents[loadedEvent.name]) continue;

            loadedEvent.execute({

                config, loadedFiles, usedEvents, usedGateways,

                session: new Session(config.session({ config, loadedFiles, usedEvents, usedGateways }))
            });
        }

        break;
    }

    default:

        console.log('Repository on https://github.com/kh0wel/ydf');

        break;
}
