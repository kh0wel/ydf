import fs from 'node:fs/promises';
import path from 'node:path';

import ChatInputCommandBuilder from '../builders/ChatInputCommandBuilder.js';

export default async function (directory) {

    const commandFolders = (await fs.readdir(directory)).filter((folder) => !folder.startsWith('.'));

    const loadedCommands = [];

    for (const folder of commandFolders) {

        loadedCommands.push(

            new ChatInputCommandBuilder({

                ... (await import(`file:///${ path.resolve(directory, folder, 'main.js') }`)).default,

                name: folder
            })
        );
    };

    return loadedCommands;
};
