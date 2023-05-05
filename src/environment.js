import path from 'node:path';

import deployment from './deployment.js';

export default function (options) {

    if (options?.directories?.events            && typeof options.directories.events           !== 'string') throw new Error('Invalid events directory');
    if (options?.directories?.services          && typeof options.directories.services         !== 'string') throw new Error('Invalid services directory');
    if (options?.directories?.commands?.chat    && typeof options.directories.commands.chat    !== 'string') throw new Error('Invalid chat input commands directory');
    if (options?.directories?.commands?.user    && typeof options.directories.commands.user    !== 'string') throw new Error('Invalid user context menu commands directory');
    if (options?.directories?.commands?.message && typeof options.directories.commands.message !== 'string') throw new Error('Invalid message context menu commands directory');

    const eventsPath                     = options?.directories?.events            ?? path.resolve(process.cwd(), 'src', 'events');
    const servicesPath                   = options?.directories?.services          ?? path.resolve(process.cwd(), 'src', 'services');
    const chatInputCommandsPath          = options?.directories?.commands?.chat    ?? path.resolve(process.cwd(), 'src', 'commands', 'chat');
    const userContextMenuCommandsPath    = options?.directories?.commands?.user    ?? path.resolve(process.cwd(), 'src', 'commands', 'user');
    const messageContextMenuCommandsPath = options?.directories?.commands?.message ?? path.resolve(process.cwd(), 'src', 'commands', 'message');

    return deployment({

        options,

        eventsPath,
        servicesPath,
        chatInputCommandsPath,
        userContextMenuCommandsPath,
        messageContextMenuCommandsPath
    });
};
