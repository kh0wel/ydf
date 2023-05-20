import fs from 'node:fs/promises';
import path from 'node:path';

import UserContextMenuCommandBuilder from '../builders/UserContextMenuCommandBuilder.js';

export default async function (directory) {

    const directoryFolders = (await fs.readdir(directory)).filter((name) => !name.startsWith('.'));

    const loadedCommands = [];

    for (const folder of directoryFolders) {

        loadedCommands.push(

            new UserContextMenuCommandBuilder({

                ... (await import(`file:///${ path.resolve(directory, folder, 'main.js') }`)).default,

                name: folder
            })
        );
    };

    return loadedCommands;
};
