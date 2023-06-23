import tglob from 'tiny-glob';
import pathe from 'pathe';

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

    const mapedFiles = await tglob(config.target, { dot: true, absolute: true });

    for (const mapedFile of mapedFiles) {

        const { default: data } = await import(`file:///${ mapedFile }`);

        switch (data.from) {

            case DataFrom.EVENT:

                loadedEvents.push({

                    ... data,

                    name: pathe.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case DataFrom.SERVICE:

                loadedServices.push({

                    ... data,

                    name: pathe.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case DataFrom.CHAT_INPUT_COMMAND:

                loadedChatInputCommands.push({

                    ... data,

                    name: pathe.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case DataFrom.USER_CONTEXT_MENU_COMMAND:

                loadedUserContextMenuCommands.push({

                    ... data,

                    name: pathe.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case DataFrom.MESSAGE_CONTEXT_MENU_COMMAND:

                loadedMessageContextMenuCommands.push({

                    ... data,

                    name: pathe.basename(mapedFile).replace(/\..+$/g, ''),

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
