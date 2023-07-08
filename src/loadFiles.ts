import glob from 'tiny-glob';

import { EventBuilder } from './structs/Event.js';
import { ServiceBuilder } from './structs/Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './structs/Command.js';

export default async function <Builder extends EventBuilder | ServiceBuilder | ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder> (src: string, cwd: string) {

    const loadedFiles: Builder[] = [];

    const mapedFiles = await glob(src, { cwd, dot: false, absolute: true });

    for (const mapedFile of mapedFiles) {

        loadedFiles.push({

            ... (await import(`file:///${ mapedFile }`)).default,

            path: mapedFile
        });
    }

    return loadedFiles.sort((a, b) => a.level - b.level);
}
