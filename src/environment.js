import path from 'node:path';

import deployment from './deployment.js';

import EventBuilder from './builders/EventBuilder.js';
import ServiceBuilder from './builders/ServiceBuilder.js';
import ChatInputCommandBuilder from './builders/ChatInputCommandBuilder.js';
import UserContextMenuCommandBuilder from './builders/UserContextMenuCommandBuilder.js';
import MessageContextMenuCommandBuilder from './builders/MessageContextMenuCommandBuilder.js';

export { EventBuilder, ServiceBuilder, ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder };

export default function (options) {

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
