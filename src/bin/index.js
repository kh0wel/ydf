import fs from 'node:fs/promises';
import path from 'node:path';

import cac from 'cac';

import { Session } from '@biscuitland/core';

const cli = cac();

cli
    .command('init', 'Create a new project')

    .option('-P, --project <path>', 'Project directory path', { default: 'new-ydf-project' })

    .action(async ({ project: projectPath }) => {

        await fs.mkdir(path.resolve(projectPath, 'src', 'events'));
        await fs.mkdir(path.resolve(projectPath, 'src', 'services'));
        await fs.mkdir(path.resolve(projectPath, 'src', 'commands'));

        await fs.writeFile(path.resolve(projectPath, '.ydf.config.js'), 'import { ConfigBuilder } from \'ydf\';\n\nexport default new ConfigBuilder ({ session ({ usedIntents, usedPartials }) { return { intents: usedIntents, partials: usedPartials, token: \'BOT TOKEN\' }; } });\n');
    });

cli
    .command('deploy', 'Deploy the framework')

    .option('-C, --config <path>', 'Config file path', { default: '.ydf.config.js' })

    .action(async ({ config: configPath }) => {

        const { default: config } = await import(`file:///${ path.resolve(configPath) }`);

        const { default: env } = await import('../index.js');

        const {

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedMessageContextMenuCommands,
            loadedUserContextMenuCommands,

            usedEvents,
            usedIntents
        }
            = await env(config);

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
    
                session: new Session(
    
                    config.session({
    
                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedMessageContextMenuCommands,
                        loadedUserContextMenuCommands,
    
                        usedEvents,
                        usedIntents
                    })
                )
            });
        }
    });

cli.help();

cli.parse();
