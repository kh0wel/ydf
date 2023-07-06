import fs from 'node:fs/promises';
import path from 'node:path';

import cac from 'cac';

import loadFiles from '../loadFiles.js';
import findEvents from '../findEvents.js';
import findGateways from '../findGateways.js';

import { ConfigBuilder } from '../structs/Config.js';
import { EventBuilder } from '../structs/Event.js';
import { ServiceBuilder } from '../structs/Service.js';
import { ChatInputCommandBuilder, UserContextMenuCommandBuilder, MessageContextMenuCommandBuilder } from '../structs/Command.js';

// @ts-expect-error
const cli = cac();

cli
    .command('init', 'Create a new project')

    .option('-P, --project <path>', 'Project directory path (default "new-ydf-project")', { default: 'new-ydf-project' })

    .action(({ project: projectPath }) => {

        fs.access(path.resolve(projectPath))

            .then(() => console.log('Project already exists'))

            .catch(async () => {

                await fs.mkdir(path.resolve(projectPath, 'src', 'events'), { recursive: true });
                await fs.mkdir(path.resolve(projectPath, 'src', 'services'), { recursive: true });
                await fs.mkdir(path.resolve(projectPath, 'src', 'commands'), { recursive: true });

                await fs.writeFile(path.resolve(projectPath, '.ydf.config.js'), 'import { ConfigBuilder } from \'ydf\';\n\nimport { Session } from \'@biscuitland/core\';\n\nexport default new ConfigBuilder ({ bot ({ usedIntents }) { return new Session({ intents: usedIntents, token: \'BOT_TOKEN\' }); } });\n');
            });
    });

cli
    .command('deploy', 'Deploy the framework')

    .option('-C, --config <path>', 'Configuration file path (default ".ydf.config.js")', { default: '.ydf.config.js' })

    .action(async ({ config: configPath }) => {

        const config: ConfigBuilder = (await import(`file:///${ path.resolve(configPath) }`)).default;

        const [

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands
        ] = await Promise.all([

            loadFiles<EventBuilder>(config.sources.events, config.cwd),
            loadFiles<ServiceBuilder>(config.sources.services, config.cwd),
            loadFiles<ChatInputCommandBuilder>(config.sources.chatInputCommands, config.cwd),
            loadFiles<UserContextMenuCommandBuilder>(config.sources.userContextMenuCommands, config.cwd),
            loadFiles<MessageContextMenuCommandBuilder>(config.sources.messageContextMenuCommands, config.cwd)
        ]);

        const usedEvents = findEvents(

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands
        );

        const { usedIntents, usedPartials } = findGateways(loadedEvents, usedEvents);

        for (const loadedEvent of loadedEvents) {

            if (!usedEvents[loadedEvent.name]) continue;

            await loadedEvent.deploy({

                config,

                bot: await config.bot({

                    config,

                    loadedEvents,
                    loadedServices,
                    loadedChatInputCommands,
                    loadedUserContextMenuCommands,
                    loadedMessageContextMenuCommands,

                    usedEvents,
                    usedIntents,
                    usedPartials
                }),

                loadedEvents,
                loadedServices,
                loadedChatInputCommands,
                loadedUserContextMenuCommands,
                loadedMessageContextMenuCommands,

                usedEvents,
                usedIntents,
                usedPartials
            });
        }
    });

cli.help();

cli.parse();
