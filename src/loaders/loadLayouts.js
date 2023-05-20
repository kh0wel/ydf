import fs from 'node:fs/promises';
import path from 'node:path';

import LayoutBuilder from '../builders/LayoutBuilder.js';

export default async function (directory) {

    const layoutFolders = (await fs.readdir(directory)).filter((name) => !name.startsWith('.'));

    const loadedLayouts = [];

    for (const folder of layoutFolders) {

        loadedLayouts.push(

            new LayoutBuilder({

                ... (await import(`file:///${ path.resolve(directory, folder, 'main.js') }`)).default,

                name: folder
            })
        );
    };

    return loadedLayouts;
};
