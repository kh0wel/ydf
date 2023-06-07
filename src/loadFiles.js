import fs from 'node:fs/promises';
import path from 'node:path';

export default async function (config) {

    async function loader (directory, target) {

        let loadedFiles = [];

        const items = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

        for (const item of items) {

            const stat = await fs.stat(path.join(directory, item));

            if (stat.isDirectory()) {

                loadedFiles = loadedFiles.concat(await loader(path.join(directory, item), target));

                continue;
            }

            if (item.includes(target)) {

                const { default: data } = await import(`file:///${ path.join(directory, item) }`);

                loadedEvents.push({

                    ... data,

                    name: item.slice(item.length - target.length),

                    path: path.join(directory, item)
                });

                break;
            }
        }

        return loadedFiles;
    }

    return {

        loadedEvents:                     await loader(path.resolve(config.directories?.events            ?? 'src/events'),   config.files?.events            ?? '.event.'),
        loadedServices:                   await loader(path.resolve(config.directories?.services          ?? 'src/services'), config.files?.services          ?? '.service.'),
        loadedChatInputCommands:          await loader(path.resolve(config.directories?.commands?.chat    ?? 'src/commands'), config.files?.commands?.chat    ?? '.command.chat.'),
        loadedUserContextMenuCommands:    await loader(path.resolve(config.directories?.commands?.user    ?? 'src/commands'), config.files?.commands?.user    ?? '.command.user.'),
        loadedMessageContextMenuCommands: await loader(path.resolve(config.directories?.commands?.message ?? 'src/commands'), config.files?.commands?.message ?? '.command.message.')
    };
}
