import path from 'node:path';

import mapFiles from './mapFiles.js';

import { ConfigBuilder } from './structs/Config.js';
import { EventBuilder } from './structs/Event.js';
import { ServiceBuilder } from './structs/Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './structs/Command.js';
import { DataFrom } from './structs/Util.js';

export default async function (config: ConfigBuilder) {

    const loadedEvents:                     EventBuilder[]                     = [];
    const loadedServices:                   ServiceBuilder[]                   = [];
    const loadedChatInputCommands:          ChatInputCommandBuilder[]          = [];
    const loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[]    = [];
    const loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[] = [];

    const mapedFiles = await mapFiles(config.include, config.exclude, config.root);

    for (const mapedFile of mapedFiles) {

        const { default: data } = await import(`file:///${ mapedFile.path }`);

        switch (data.from) {

            case DataFrom.EVENT:

                loadedEvents.push({

                    ... data,

                    name: mapedFile.name.slice(0, mapedFile.name.length - mapedFile.extension.length),

                    path: mapedFile.path
                });

                break;

            case DataFrom.SERVICE:

                loadedServices.push({

                    ... data,

                    name: mapedFile.name.slice(0, mapedFile.name.length - mapedFile.extension.length),

                    path: mapedFile.path
                });

                break;

            case DataFrom.CHAT_INPUT_COMMAND:

                loadedChatInputCommands.push({

                    ... data,

                    name: mapedFile.name.slice(0, mapedFile.name.length - mapedFile.extension.length),

                    path: mapedFile.path
                });

                break;

            case DataFrom.USER_CONTEXT_MENU_COMMAND:

                loadedUserContextMenuCommands.push({

                    ... data,

                    name: mapedFile.name.slice(0, mapedFile.name.length - mapedFile.extension.length),

                    path: mapedFile.path
                });

                break;

            case DataFrom.MESSAGE_CONTEXT_MENU_COMMAND:

                loadedMessageContextMenuCommands.push({

                    ... data,

                    name: mapedFile.name.slice(0, mapedFile.name.length - mapedFile.extension.length),

                    path: mapedFile.path
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
