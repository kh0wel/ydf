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

                await fs.writeFile(path.resolve(projectPath, '.ydf.config.js'), 'import { Client } from \'discord.js\';\n\nexport default {\n\tbot ({ usedIntents }) {\n\n\t\treturn new Client({ intents: usedIntents, partials: usedPartials });\n\t}\n};\n');
            });
    });

cli
    .command('deploy', 'Deploy the bot')

    .option('-C, --config <path>', 'Configuration file path (default is ".ydf.config.js")', { default: '.ydf.config.js' })

    .action(async ({ config: configPath }) => {

        const { default: config } = await import(`file:///${ path.resolve(configPath) }`);

        const {

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands
        } = await loadFiles(config);

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

                loadedEvents,
                loadedServices,
                loadedChatInputCommands,
                loadedMessageContextMenuCommands,
                loadedUserContextMenuCommands,

                usedEvents,
                usedIntents,
                usedPartials,

                bot: config.bot({

                    loadedEvents,
                    loadedServices,
                    loadedChatInputCommands,
                    loadedMessageContextMenuCommands,
                    loadedUserContextMenuCommands,

                    usedEvents,
                    usedIntents,
                    usedPartials
                })
            });
        }
    });

cli.help();

cli.parse();
