import fs from 'node:fs/promises';
import path from 'node:path';

import cac from 'cac';

import loadFiles from '../loadFiles.js';
import findEvents from '../findEvents.js';
import findGateways from '../findGateways.js';

import { EventBuilder } from '../structs/Event.js';
import { ServiceBuilder } from '../structs/Service.js';
import { ChatInputCommandBuilder } from '../structs/ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from '../structs/UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from '../structs/MessageContextMenuCommand.js';

// @ts-expect-error
const cli = cac();

cli
    .command('init', 'Create a new project')

    .option('-P, --project <path>', 'Project directory path (default is "new-ydf-project")', { default: 'new-ydf-project' })

    .action(async ({ project: projectPath }) => {

        await fs.mkdir(path.resolve(projectPath, 'src', 'events'),    { recursive: true });
        await fs.mkdir(path.resolve(projectPath, 'src', 'services'),  { recursive: true });
        await fs.mkdir(path.resolve(projectPath, 'src', 'commands'),  { recursive: true });

        await fs.writeFile(path.resolve(projectPath, '.ydf.config.js'), 'import { Session } from \'@biscuitland/core\';\n\nimport { ConfigurationBuilder } from \'ydf\';\n\nexport default new ConfigurationBuilder ({ deployer ({ usedIntents }) { return new Session({ intents: usedIntents, token: \'BOT TOKEN\' }); } });\n');
    });

cli
    .command('deploy', 'Deploy the framework')

    .option('-C, --config <path>', 'Configuration file path (default is ".ydf.config.js")', { default: '.ydf.config.js' })

    .action(async ({ config: configPath }) => {

        const { default: config } = await import(`file:///${ path.resolve(configPath) }`);

        const loadedEvents:                     EventBuilder[]                     = await loadFiles(config.include.events,                    config.exclude.events,                    EventBuilder);
        const loadedServices:                   ServiceBuilder[]                   = await loadFiles(config.include.services,                  config.exclude.services,                  ServiceBuilder);
        const loadedChatInputCommands:          ChatInputCommandBuilder[]          = await loadFiles(config.include.chatInputCommand,          config.exclude.chatInputCommand,          ChatInputCommandBuilder);
        const loadedUserContextMenuCommands:    UserContextMenuCommandBuilder[]    = await loadFiles(config.include.userContextMenuCommand,    config.exclude.userContextMenuCommand,    UserContextMenuCommandBuilder);
        const loadedMessageContextMenuCommands: MessageContextMenuCommandBuilder[] = await loadFiles(config.include.messageContextMenuCommand, config.exclude.messageContextMenuCommand, MessageContextMenuCommandBuilder);

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
