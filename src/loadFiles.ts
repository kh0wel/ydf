import path from 'node:path';

import fglob from 'fast-glob';

import { EventBuilder } from './struc/Event.js';
import { ServiceBuilder } from './struc/Service.js';
import { ChatInputCommandBuilder } from './struc/ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from './struc/UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from './struc/MessageContextMenuCommand.js';

export default async function ({ include, exclude }: { include: string[], exclude: string[] }) {

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

                    metadata: {

                        name: path.basename(mapedFile).replace(/\..+$/g, ''),

                        path: mapedFile
                    }
                });

                break;

            case 2:

                loadedServices.push({

                    ... data,

                    metadata: {

                        name: path.basename(mapedFile).replace(/\..+$/g, ''),

                        path: mapedFile
                    }
                });

                break;

            case 3:

                loadedChatInputCommands.push({

                    ... data,

                    metadata: {

                        name: path.basename(mapedFile).replace(/\..+$/g, ''),

                        path: mapedFile
                    }
                });

                break;

            case 4:

                loadedUserContextMenuCommands.push({

                    ... data,

                    metadata: {

                        name: path.basename(mapedFile).replace(/\..+$/g, ''),

                        path: mapedFile
                    }
                });

                break;

            case 5:

                loadedMessageContextMenuCommands.push({

                    ... data,

                    metadata: {

                        name: path.basename(mapedFile).replace(/\..+$/g, ''),

                        path: mapedFile
                    }
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
