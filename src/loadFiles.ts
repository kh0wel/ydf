import path from 'node:path';

import glob from 'fast-glob';

import { SettingsBuilder } from './structs/Settings.js';
import { EventBuilder } from './structs/Event.js';
import { ServiceBuilder } from './structs/Service.js';
import { ChatInputCommandBuilder } from './structs/ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from './structs/UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from './structs/MessageContextMenuCommand.js';
import { LoadedFile } from './structs/Util.js';

export default async function (settings: SettingsBuilder) {

    const loadedEvents:                     LoadedFile<EventBuilder>[]                     = [];
    const loadedServices:                   LoadedFile<ServiceBuilder>[]                   = [];
    const loadedChatInputCommands:          LoadedFile<ChatInputCommandBuilder>[]          = [];
    const loadedUserContextMenuCommands:    LoadedFile<UserContextMenuCommandBuilder>[]    = [];
    const loadedMessageContextMenuCommands: LoadedFile<MessageContextMenuCommandBuilder>[] = [];

    const mapedFiles = await glob(settings.include, {

        ignore: settings.exclude,

        dot: true, absolute: true
    });

    for (const mapedFile of mapedFiles) {

        const { default: data } = await import(`file:///${ mapedFile }`);

        switch (data.type) {

            case 1:

                loadedEvents.push({

                    ... data as EventBuilder,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case 2:

                loadedServices.push({

                    ... data as ServiceBuilder,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case 3:

                loadedChatInputCommands.push({

                    ... data as ChatInputCommandBuilder,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case 4:

                loadedUserContextMenuCommands.push({

                    ... data as UserContextMenuCommandBuilder,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case 5:

                loadedMessageContextMenuCommands.push({

                    ... data as MessageContextMenuCommandBuilder,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;
        }
    }

    return {

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands
    };
}
