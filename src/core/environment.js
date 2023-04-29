import { Client } from 'discord.js';

import path from 'node:path';

import loadEvents from './loaders/loadEvents.js';
import loadServices from './loaders/loadServices.js';
import loadChatInputCommands from './loaders/loadChatInputCommands.js';
import loadUserContextMenuCommands from './loaders/loadUserContextMenuCommands.js';
import loadMessageContextMenuCommands from './loaders/loadMessageContextMenuCommands.js';

import groupEvents from './groupers/groupEvents.js';
import groupIntents from './groupers/groupIntents.js';
import groupPartials from './groupers/groupPartials.js';

import EventBuilder from './builders/EventBuilder.js';
import ServiceBuilder from './builders/ServiceBuilder.js';
import ChatInputCommandBuilder from './builders/ChatInputCommandBuilder.js';
import UserContextMenuCommandBuilder from './builders/UserContextMenuCommandBuilder.js';
import MessageContextMenuCommandBuilder from './builders/MessageContextMenuCommandBuilder.js';
import deployment from './deployment.js';

export {

    loadEvents,
    loadServices,
    loadChatInputCommands,
    loadUserContextMenuCommands,
    loadMessageContextMenuCommands,

    groupEvents,
    groupIntents,
    groupPartials,

    EventBuilder,
    ServiceBuilder,
    ChatInputCommandBuilder,
    UserContextMenuCommandBuilder,
    MessageContextMenuCommandBuilder
};

export default async function (options) {

    const eventsPath                     = options?.directories?.events            ?? path.resolve(process.cwd(), 'src', 'events');
    const servicesPath                   = options?.directories?.services          ?? path.resolve(process.cwd(), 'src', 'services');
    const chatInputCommandsPath          = options?.directories?.commands?.chat    ?? path.resolve(process.cwd(), 'src', 'commands', 'chat');
    const userContextMenuCommandsPath    = options?.directories?.commands?.user    ?? path.resolve(process.cwd(), 'src', 'commands', 'user');
    const messageContextMenuCommandsPath = options?.directories?.commands?.message ?? path.resolve(process.cwd(), 'src', 'commands', 'message');

    const loadedEvents                     = await (options?.loaders?.events            ?? loadEvents                    )(eventsPath);
    const loadedServices                   = await (options?.loaders?.services          ?? loadServices                  )(servicesPath);
    const loadedChatInputCommands          = await (options?.loaders?.commands?.chat    ?? loadChatInputCommands         )(chatInputCommandsPath);
    const loadedUserContextMenuCommands    = await (options?.loaders?.commands?.user    ?? loadUserContextMenuCommands   )(userContextMenuCommandsPath);
    const loadedMessageContextMenuCommands = await (options?.loaders?.commands?.message ?? loadMessageContextMenuCommands)(messageContextMenuCommandsPath);

    const usedEvents = (options?.groupers?.events ?? groupEvents)({

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands
    });

    const usedIntents = (options?.groupers?.intents ?? groupIntents)({

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands,

        usedEvents
    });

    const usedPartials = (options?.groupers?.partials ?? groupPartials)({

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands,

        usedEvents
    });

    const client = new Client({

        intents: options?.intents?.force

            ? options.intents.bits

            : usedIntents.concat(options?.intents?.bits),

        partials: options?.partials?.force

            ? options.partials.bits

            : usedPartials.concat(options?.partials?.bits),

        ... options?.client
    });

    return deployment({

        client,

        eventsPath,
        servicesPath,
        chatInputCommandsPath,
        userContextMenuCommandsPath,
        messageContextMenuCommandsPath,

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands,

        usedEvents,
        usedIntents,
        usedPartials
    });
};
