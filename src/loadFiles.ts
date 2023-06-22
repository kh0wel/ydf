import path from 'node:path';

import glob from 'fast-glob';

import { ConfigurationBuilder } from './structs/Configuration.js';
import { EventBuilder } from './structs/Event.js';
import { ServiceBuilder } from './structs/Service.js';
import { ChatInputCommandBuilder } from './structs/ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from './structs/UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from './structs/MessageContextMenuCommand.js';
import { BuilderFrom } from './structs/Util.js';

export default async function (config: ConfigurationBuilder) {

    const loadedEvents:                     EventBuilder[]                     = [];
    const loadedServices:                   ServiceBuilder[]                   = [];
    const loadedChatInputCommands:          ChatInputCommandBuilder[]          = [];
    const loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[]    = [];
    const loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[] = [];

    const mapedFiles = await glob(config.include, {

        ignore: config.exclude,

        dot: true, absolute: true
    });

    for (const mapedFile of mapedFiles) {

        const { default: data } = await import(`file:///${ mapedFile }`);

        switch (data.from) {

            case BuilderFrom.EVENT:

                loadedEvents.push({

                    ... data,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case BuilderFrom.SERVICE:

                loadedServices.push({

                    ... data,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case BuilderFrom.CHAT_INPUT_COMMAND:

                loadedChatInputCommands.push({

                    ... data,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case BuilderFrom.USER_CONTEXT_MENU_COMMAND:

                loadedUserContextMenuCommands.push({

                    ... data,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case BuilderFrom.MESSAGE_CONTEXT_MENU_COMMAND:

                loadedMessageContextMenuCommands.push({

                    ... data,

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
