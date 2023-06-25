import fs from 'node:fs/promises';
import path from 'node:path';

import cac from 'cac';
import kleur from 'kleur';

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

            .then(() => console.log(kleur.red('Project already exists')))

            .catch(async () => {

                await fs.mkdir(path.resolve(projectPath, 'src', 'events'),    { recursive: true });
                await fs.mkdir(path.resolve(projectPath, 'src', 'services'),  { recursive: true });
                await fs.mkdir(path.resolve(projectPath, 'src', 'commands'),  { recursive: true });

                await fs.writeFile(path.resolve(projectPath, '.ydf.config.js'), 'import { Session } from \'@biscuitland/core\';\n\nimport { ConfigBuilder } from \'ydf\';\n\nexport default new ConfigBuilder ({\n\tbot ({ usedIntents }) {\n\n\t\treturn new Session({ intents: usedIntents, token: \'BOT TOKEN\' });\n\t}\n});\n');

                console.log(kleur.bold().blue('GitHub:'), kleur.gray('https://github.com/kh0wel/ydf'));
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

        console.log(kleur.bold().cyan('Used Files:'));

        console.log();

        console.log(kleur.gray('Events:                       '), loadedEvents.length);
        console.log(kleur.gray('Services:                     '), loadedServices.length);
        console.log(kleur.gray('Chat Input Commands:          '), loadedChatInputCommands.length);
        console.log(kleur.gray('User Context Menu Commands:   '), loadedUserContextMenuCommands.length);
        console.log(kleur.gray('Message Context Menu Commands:'), loadedMessageContextMenuCommands.length);

        console.log();

        console.log(kleur.bold().green('Used Gateways:'));

        console.log();

        console.log(kleur.gray('Intents:'), usedIntents);
        console.log(kleur.gray('Partials:'), usedPartials);

        console.log();
    });

cli.help();

cli.parse();
