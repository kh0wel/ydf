import fs from 'node:fs/promises';
import path from 'node:path';

import EventBuilder from '../builders/EventBuilder.js';

export default async function (directory) {

    const eventFolders = (await fs.readdir(directory)).filter((folder) => !folder.startsWith('.'));

    const loadedEvents = [];

    for (const folder of eventFolders) {

        loadedEvents.push(

            new EventBuilder({

                ... (await import(`file:///${ path.resolve(directory, folder, 'main.js') }`)).default,

                name: folder
            })
        );
    };

    return loadedEvents;
};
