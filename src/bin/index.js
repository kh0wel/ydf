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

        await fs.writeFile(path.resolve(projectPath, '.ydfrc'), 'import { SettingsBuilder } from \'ydf\';\n\nexport default new SettingsBuilder ({ session ({ usedIntents, usedPartials }) { return { intents: usedIntents, partials: usedPartials, token: \'BOT TOKEN\' }; } });\n');
    });

cli
    .command('deploy', 'Deploy the framework')

    .option('-C, --settings <path>', 'Settings file path', { default: '.ydfrc' })

    .action(async ({ settings: settingsPath }) => {

        const { default: settings } = await import(`file:///${ path.resolve(settingsPath) }`);

        const { default: environment } = await import('../index.js');

        const {

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedMessageContextMenuCommands,
            loadedUserContextMenuCommands,

            usedEvents,
            usedIntents
        }
            = await environment(settings);

        for (const loadedEvent of loadedEvents) {

            if (!usedEvents[loadedEvent.name]) continue;

            loadedEvent.execute({

                settings,
    
                loadedEvents,
                loadedServices,
                loadedChatInputCommands,
                loadedMessageContextMenuCommands,
                loadedUserContextMenuCommands,
    
                usedEvents,
                usedIntents,
    
                session: new Session(
    
                    settings.session({
    
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
