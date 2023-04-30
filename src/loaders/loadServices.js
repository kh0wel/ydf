import fs from 'node:fs/promises';
import path from 'node:path';

import ServiceBuilder from '../builders/ServiceBuilder.js';

export default async function (directory) {

    const serviceFolders = (await fs.readdir(directory)).filter((name) => !name.startsWith('.'));

    const loadedServices = [];

    for (const folder of serviceFolders) {

        loadedServices.push(

            new ServiceBuilder({

                ... (await import(`file:///${ path.resolve(directory, folder, 'main.js') }`)).default,

                name: folder
            })
        );
    };

    return loadedServices;
};
