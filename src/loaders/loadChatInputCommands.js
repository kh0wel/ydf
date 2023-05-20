import fs from 'node:fs/promises';
import path from 'node:path';

import ChatInputCommandBuilder from '../builders/ChatInputCommandBuilder.js';

export default async function (directory) {

    const directoryFolders = (await fs.readdir(directory)).filter((name) => !name.startsWith('.'));

    const loadedCommands = [];

    for (const folder of directoryFolders) {

        loadedCommands.push(

            new ChatInputCommandBuilder({

                ... (await import(`file:///${ path.resolve(directory, folder, 'main.js') }`)).default,

                name: folder
            })
        );
    };

    return loadedCommands;
};
