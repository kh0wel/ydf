import fs from 'node:fs/promises';
import path from 'node:path';

import ServiceBuilder from '../builders/ServiceBuilder.js';

export default async function (directory) {

    const serviceFolders = (await fs.readdir(directory)).filter((name) => !name.startsWith('.'));

    const loadedServices = [];

    for (const folder of serviceFolders) {

        const loadedService = await import(`file:///${ path.resolve(directory, folder, 'main.js') }`);

        loadedServices.push(new ServiceBuilder({ ...loadedService.default, name: folder }));
    };

    return loadedServices;
};
