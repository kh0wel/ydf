import fs from 'node:fs/promises';
import path from 'node:path';

import UserContextMenuCommandBuilder from '../builders/UserContextMenuCommandBuilder.js';

export default async function (directory) {

    const commandFolders = (await fs.readdir(directory)).filter((name) => !name.startsWith('.'));

    const loadedCommands = [];

    for (const folder of commandFolders) {

        const loadedCommand = await import(`file:///${ path.resolve(directory, folder, 'main.js') }`);

        loadedCommands.push(new UserContextMenuCommandBuilder({ ...loadedCommand.default, name: folder }));
    };

    return loadedCommands;
};
