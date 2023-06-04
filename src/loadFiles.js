import fs from 'node:fs/promises';
import path from 'node:path';

import { EventBuilder } from './structures/Event.js';
import { ServiceBuilder } from './structures/Service.js';
import { ChatInputCommandBuilder } from './structures/ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from './structures/UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from './structures/MessageContextMenuCommand.js';

export default async function (config) {

    const laodedEvents                     = [];
    const laodedServices                   = [];
    const laodedChatInputCommands          = [];
    const loadedUserContextMenuCommands    = [];
    const loadedMessageContextMenuCommands = [];

    async function loader (directory) {

        let loaded = [];

        const items = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

        for (const item of items) {
    
            const stat = await fs.stat(path.join(directory, item));
    
            if (stat.isDirectory()) {
    
                loaded = loaded.concat(await loader(path.join(directory, item)));
    
                continue;
            }
    
            if (item.endsWith()) {
    
                const { default: data } = await import(`file:///${ path.join(directory, item) }`);
    
                loaded.push(
    
                    new Builder({
    
                        ... data,
    
                        name: item.slice(0, item.length - target.length),
    
                        path: path.join(directory, item)
                    })
                );
    
                break;
            }
        }

        return loaded;
    };

    for (const included of config.include) {

        await loader(path.resolve(included));
    };

    return {
        
        laodedEvents,
        laodedServices,
        laodedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands
    };
}
