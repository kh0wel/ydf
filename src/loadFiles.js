import fs from 'node:fs/promises';
import path from 'node:path';

export default async function (config) {

    const loadedEvents                     = [];
    const loadedServices                   = [];
    const loadedChatInputCommands          = [];
    const loadedUserContextMenuCommands    = [];
    const loadedMessageContextMenuCommands = [];

    async function parser (directory) {

        const parsedItems = [];

        const items = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

        for (const item of items) {

            const stat = await fs.stat(path.join(directory, item));

            if (stat.isDirectory()) {

                await parser(path.join(directory, item));

                continue;
            }

            parsedItems.push(path.join(directory, item));
        }

        return parsedItems;
    }

    async function loader (directory) {

        const parsedFiles = await parser(directory);

        for (const parsedFile of parsedFiles) {

            if (item.endsWith('XD')) {

                const { default: data } = await import(`file:///${ parsedFile }`);

                loadedEvents.push({

                    ... data,

                    name: path.basename(parsedFile),

                    path: parsedFile
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
