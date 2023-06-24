import fs from 'node:fs/promises';
import path from 'node:path';

import globalyzer from './globalyzer.js';
import globrex from './globrex.js';

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

    async function glob (target: string, ignore: string, root: string) {

        const glob = globalyzer(target);

        if (!glob.isGlob) {

            try {

                const resolved = path.resolve(root, target);

                const dirent = await fs.stat(resolved);

                if (!dirent.isFile()) return [];

                return resolved;
            } catch (err) {

                // @ts-expect-error
                if (err.code !== 'ENOENT') throw err;

                return [];
            }
        }

        const matches = [];

        const { path: path_ } = globrex(glob.glob);

        path_.globstar = path_.globstar.toString();

        await walk(matches, glob.base, path_, root, '.', 0);

        return matches;
      }

      async function walk (array: string[], prefix, lexer, root: string, dirname='', level=0) {

        const rgx = lexer.segments[level];

        const dir = path.resolve(root, prefix, dirname);

        const files = await fs.readdir(dir);

        let relpath;
        let stats;

        for (let i = 0; i < files.length; i++) {

            const file = files[i];

            const filePath = path.join(dir, file);

            relpath = dirname ? path.join(dirname, file) : file;

          if (stats.isDirectory()) continue;

          array.push(filePath);

          if (rgx && !rgx.test(file)) continue;

          await walk(array, prefix, lexer, root, relpath, rgx && rgx.toString() !== lexer.globstar && level + 1);
        }
      }
      















    const mapedFiles = await glob(config.include, config.exclude, config.root);

    for (const mapedFile of mapedFiles) {

        const { default: data } = await import(`file:///${ mapedFile }`);

        switch (data.from) {

            case DataFrom.EVENT:

                loadedEvents.push({

                    ... data,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case DataFrom.SERVICE:

                loadedServices.push({

                    ... data,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case DataFrom.CHAT_INPUT_COMMAND:

                loadedChatInputCommands.push({

                    ... data,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case DataFrom.USER_CONTEXT_MENU_COMMAND:

                loadedUserContextMenuCommands.push({

                    ... data,

                    name: path.basename(mapedFile).replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case DataFrom.MESSAGE_CONTEXT_MENU_COMMAND:

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
