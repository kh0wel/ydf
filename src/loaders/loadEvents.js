import fs from 'node:fs/promises';
import path from 'node:path';

import EventBuilder from '../builders/EventBuilder.js';

export default async function (directory) {

    const eventFolders = (await fs.readdir(directory)).filter((name) => !name.startsWith('.'));

    const loadedEvents = [];

    for (const folder of eventFolders) {

        const loadedEvent = await import(`file:///${ path.resolve(directory, folder, 'main.js') }`);

        loadedEvents.push(new EventBuilder({ ...loadedEvent.default, name: folder }));
    };

    return loadedEvents;
};
