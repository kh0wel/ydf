import fs from 'node:fs/promises';
import path from 'node:path';

import LayoutBuilder from '../builders/LayoutBuilder.js';

export default async function (directory) {

    const directoryFolders = (await fs.readdir(directory)).filter((name) => !name.startsWith('.'));

    const loadedLayouts = [];

    for (const folder of directoryFolders) {

        loadedLayouts.push(

            new LayoutBuilder({

                ... (await import(`file:///${ path.resolve(directory, folder, 'main.js') }`)).default,

                name: folder
            })
        );
    };

    return loadedLayouts;
};
