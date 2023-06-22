import fs from 'node:fs/promises';
import path from 'node:path';

import loadFiles from '../loadFiles.js';
import findEvents from '../findEvents.js';
import findGateways from '../findGateways.js';

// @ts-expect-error
const cli = cac();

cli
    .command('init', 'Create a new project')

    .option('-P, --project <path>', 'Project directory path (default is "new-ydf-project")', { default: 'new-ydf-project' })

    .action(async ({ project: projectPath }) => {

        await fs.mkdir(path.resolve(projectPath, 'src', 'events'));
        await fs.mkdir(path.resolve(projectPath, 'src', 'services'));
        await fs.mkdir(path.resolve(projectPath, 'src', 'commands'));

        await fs.writeFile(path.resolve(projectPath, '.ydf.config.js'), 'import { Session } from \'@biscuitland/core\';\n\nimport { ConfigBuilder } from \'ydf\';\n\nexport default new ConfigBuilder ({ deployer ({ usedIntents, usedPartials }) { return new Session({ intents: usedIntents, partials: usedPartials, token: \'BOT TOKEN\' }); } });\n');
    });

cli
    .command('deploy', 'Deploy the framework')

    .option('-C, --config <path>', 'Configuration file path (default is ".ydf.config.js")', { default: '.ydf.config.js' })

    .action(async ({ config: configPath }) => {

        const { default: config } = await import(`file:///${ path.resolve(configPath) }`);

        const {

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedMessageContextMenuCommands,
            loadedUserContextMenuCommands
        }
            = await loadFiles(config);

        const usedEvents = findEvents(

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedMessageContextMenuCommands,
            loadedUserContextMenuCommands
        );

        const { usedIntents } = findGateways(loadedEvents, usedEvents);

        for (const loadedEvent of loadedEvents) {

            if (!usedEvents[loadedEvent.name]) continue;

            loadedEvent.execute({

                config,

                loadedEvents,
                loadedServices,
                loadedChatInputCommands,
                loadedMessageContextMenuCommands,
                loadedUserContextMenuCommands,

                usedEvents,
                usedIntents,

                session: config.deployer({

                    loadedEvents,
                    loadedServices,
                    loadedChatInputCommands,
                    loadedMessageContextMenuCommands,
                    loadedUserContextMenuCommands,

                    usedEvents,
                    usedIntents
                })
            });
        }
    });

cli.help();

cli.parse();
