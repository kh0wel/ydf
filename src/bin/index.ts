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

    .option('-P, --project <path>', 'Project directory path (default is "new-ydf-project")', { default: 'new-ydf-project' })

    .action(({ project: projectPath }) => {

        fs.access(path.resolve(projectPath))

            .then(() => console.log('Project already exists'))

            .catch(async () => {

                await fs.mkdir(path.resolve(projectPath, 'src', 'events'), { recursive: true });
                await fs.mkdir(path.resolve(projectPath, 'src', 'services'), { recursive: true });
                await fs.mkdir(path.resolve(projectPath, 'src', 'commands'), { recursive: true });

                await fs.writeFile(path.resolve(projectPath, '.ydf.config.js'), 'import { Session } from \'@biscuitland/core\';\nimport { ConfigBuilder } from \'ydf\';\n\nexport default new ConfigBuilder({ bot ({ usedIntents }) { return new Session({ intents: usedIntents, token: \'BOT_TOKEN\' }); } });\n');
            });
    });

cli
    .command('deploy', 'Deploy the bot')

    .option('-C, --config <path>', 'Configuration file path (default is ".ydf.config.js")', { default: '.ydf.config.js' })

    .action(async ({ config: configPath }) => {

        const config: ConfigBuilder = (await import(`file:///${ path.resolve(configPath) }`)).default;

        const [

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands
        ] = await Promise.all([

            loadFiles<EventBuilder>(config.files.events, config.project),
            loadFiles<ServiceBuilder>(config.files.services, config.project),
            loadFiles<ChatInputCommandBuilder>(config.files.chatInputCommands, config.project),
            loadFiles<UserContextMenuCommandBuilder>(config.files.userContextMenuCommands, config.project),
            loadFiles<MessageContextMenuCommandBuilder>(config.files.messageContextMenuCommands, config.project)
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
