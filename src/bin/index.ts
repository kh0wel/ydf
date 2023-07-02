import fs from 'node:fs/promises';
import path from 'node:path';

import cac from 'cac';

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

                await fs.writeFile(path.resolve(projectPath, '.ydf.config.js'), 'import { Session } from \'@biscuitland/core\';\n\nexport default {\n\tbot ({ usedIntents }) {\n\n\t\treturn new Session({ intents: usedIntents, token: \'BOT TOKEN\' });\n\t}\n};\n');
            });
    });

cli
    .command('deploy', 'Deploy the bot')

    .option('-C, --config <path>', 'Configuration file path (default is ".ydf.config.js")', { default: '.ydf.config.js' })

    .action(async ({ config: configPath }) => {

        const { default: config } = await import(`file:///${ path.resolve(configPath) }`);
        
    });

cli.help();

cli.parse();
