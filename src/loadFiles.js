import fs from 'node:fs/promises';
import path from 'node:path';

import { EventBuilder } from './structures/Event.js';
import { ServiceBuilder } from './structures/Service.js';
import { ChatInputCommandBuilder } from './structures/ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from './structures/UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from './structures/MessageContextMenuCommand.js';

export default async function (config) {

    const loadedEvents                     = [];
    const loadedServices                   = [];
    const loadedChatInputCommands          = [];
    const loadedUserContextMenuCommands    = [];
    const loadedMessageContextMenuCommands = [];

    async function loader (directory) {

        const items = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

        for (const item of items) {

            const stat = await fs.stat(path.join(directory, item));

            if (stat.isDirectory()) {

                await loader(path.join(directory, item))

                continue;
            }

            if (item.endsWith()) {

                const { default: data } = await import(`file:///${ path.join(directory, item) }`);

                if (data instanceof EventBuilder) loadedEvents.push({

                    ... data,

                    name: item.slice(0, item.length - target.length),

                    path: path.join(directory, item)
                });

                if (data instanceof ServiceBuilder) loadedServices.push({

                    ... data,

                    name: item.slice(0, item.length - target.length),

                    path: path.join(directory, item)
                });

                if (data instanceof ChatInputCommandBuilder) loadedChatInputCommands.push({

                    ... data,

                    name: item.slice(0, item.length - target.length),

                    path: path.join(directory, item)
                });

                if (data instanceof UserContextMenuCommandBuilder) loadedUserContextMenuCommands.push({

                    ... data,

                    name: item.slice(0, item.length - target.length),

                    path: path.join(directory, item)
                });

                if (data instanceof MessageContextMenuCommandBuilder) loadedMessageContextMenuCommands.push({

                    ... data,

                    name: item.slice(0, item.length - target.length),

                    path: path.join(directory, item)
                });

                break;
            }
        }
    }

    for (const included of config.include) {

        await loader(path.resolve(included));
    }

    return {
        
        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands
    };
}
