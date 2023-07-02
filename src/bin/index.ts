import fs from 'node:fs/promises';
import path from 'node:path';

import cac from 'cac';

import loadFiles from '../loadFiles.js';
import findEvents from '../findEvents.js';
import findGateways from '../findGateways.js';

// @ts-expect-error
const cli = cac();

cli
    .command('init', 'Create a new project')

    .option('-P, --project <path>', 'Project directory path (default is "new-ydf-project")', { default: 'new-ydf-project' })

    .action(({ project: projectPath }) => {

        fs.access(path.resolve(projectPath))

            .then(() => console.log('Project already exists'))

            .catch(async () => {

                await fs.mkdir(path.resolve(projectPath, 'src', 'events'),    { recursive: true });
                await fs.mkdir(path.resolve(projectPath, 'src', 'services'),  { recursive: true });
                await fs.mkdir(path.resolve(projectPath, 'src', 'commands'),  { recursive: true });

                await fs.writeFile(path.resolve(projectPath, '.ydf.config.js'), 'import { Session } from \'@biscuitland/core\';\n\nexport default { bot ({ usedIntents }) { return new Session({ intents: usedIntents, token: \'BOT TOKEN\' }); } };\n');
            });
    });

cli
    .command('deploy', 'Deploy the bot')

    .option('-C, --config <path>', 'Configuration file path (default is ".ydf.config.js")', { default: '.ydf.config.js' })

    .action(async ({ config: configPath }) => {

        const { default: config } = await import(`file:///${ path.resolve(configPath) }`);

        const loadedEvents                     = await loadFiles(config.files.events,                     config.root);
        const loadedServices                   = await loadFiles(config.files.services,                   config.root);
        const loadedChatInputCommands          = await loadFiles(config.files.chatInputCommands,          config.root);
        const loadedUserContextMenuCommands    = await loadFiles(config.files.userContextMenuCommands,    config.root);
        const loadedMessageContextMenuCommands = await loadFiles(config.files.messageContextMenuCommands, config.root);

        const usedEvents = findEvents(

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedMessageContextMenuCommands,
            loadedUserContextMenuCommands
        );

        const { usedIntents, usedPartials } = findGateways(loadedEvents, usedEvents);

        for (const loadedEvent of loadedEvents) {

            if (!usedEvents[loadedEvent.name]) continue;

            await loadedEvent.execute({

                config,

                bot: config.bot({

                    loadedEvents,
                    loadedServices,
                    loadedChatInputCommands,
                    loadedMessageContextMenuCommands,
                    loadedUserContextMenuCommands,

                    usedEvents,
                    usedIntents,
                    usedPartials
                }),

                loadedEvents,
                loadedServices,
                loadedChatInputCommands,
                loadedMessageContextMenuCommands,
                loadedUserContextMenuCommands,

                usedEvents,
                usedIntents,
                usedPartials
            });
        }
    });

cli.help();

cli.parse();
