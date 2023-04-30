import fs from 'node:fs/promises';
import path from 'node:path';

import MessageContextMenuCommandBuilder from '../builders/MessageContextMenuCommandBuilder.js';

export default async function (directory) {

    const commandFolders = (await fs.readdir(directory)).filter((name) => !name.startsWith('.'));

    const loadedCommands = [];

    for (const folder of commandFolders) {

        loadedCommands.push(

            new MessageContextMenuCommandBuilder({

                ... (await import(`file:///${ path.resolve(directory, folder, 'main.js') }`)).default,

                name: folder
            })
        );
    };

    return loadedCommands;
};
