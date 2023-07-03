import path from 'node:path';

import glob from 'tiny-glob';

import { EventBuilder } from './structs/Event.js';
import { ServiceBuilder } from './structs/Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from './structs/Command.js';

export default async function <

    Builder extends

    EventBuilder |
    ServiceBuilder |
    ChatInputCommandBuilder |
    UserContextMenuCommandBuilder |
    MessageContextMenuCommandBuilder
> (target: string, cwd: string) {

    const loadedFiles: Builder[] = [];

    const mapedFiles = await glob(target, { cwd, dot: true, absolute: true });

    for (const mapedFile of mapedFiles) {

        loadedFiles.push({

            ... (await import(`file:///${ mapedFile }`)).default,

            name: path.basename(mapedFile).replace(/\..+$/g, ''),

            path: mapedFile
        });
    }

    return loadedFiles;
}
