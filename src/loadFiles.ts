import path from 'node:path';

import fglob from 'fast-glob';

import { ConfigBuilder } from './struc/Configuration.js';
import { EventBuilder } from './struc/Event.js';
import { ServiceBuilder } from './struc/Service.js';
import { ChatInputCommandBuilder } from './struc/ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from './struc/UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from './struc/MessageContextMenuCommand.js';

export default async function ({ include, exclude }: ConfigBuilder) {

    const loadedEvents:                     EventBuilder[]                     = [];
    const loadedServices:                   ServiceBuilder[]                   = [];
    const loadedChatInputCommands:          ChatInputCommandBuilder[]          = [];
    const loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[]    = [];
    const loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[] = [];

    const mapedFiles = await fglob(include, {

        ignore: exclude,

        dot: true, absolute: true
    });

    for (const mapedFile of mapedFiles) {

        const { default: data }: { default: EventBuilder | ServiceBuilder | ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder } = await import(`file:///${ mapedFile }`);

        switch (data.type) {

            case 1:

                loadedEvents.push({

                    ... data,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                } as EventBuilder);

                break;

            case 2:

                loadedServices.push({

                    ... data,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                } as ServiceBuilder);

                break;

            case 3:

                loadedChatInputCommands.push({

                    ... data,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                } as ChatInputCommandBuilder);

                break;

            case 4:

                loadedUserContextMenuCommands.push({

                    ... data,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                } as UserContextMenuCommandBuilder);

                break;

            case 5:

                loadedMessageContextMenuCommands.push({

                    ... data,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                } as MessageContextMenuCommandBuilder);

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
