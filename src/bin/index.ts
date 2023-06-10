import fs from 'node:fs/promises';
import path from 'node:path';

import cac from 'cac';

const cli = cac();

cli
    .command('init', 'Create a new project')

    .option('-p, --project-path <path>', 'Project directory path', { default: 'new-ydf-project' })

    .action(async ({ projectPath }) => {

        await fs.mkdir(path.resolve(projectPath, 'src', 'events'),   { recursive: true });
        await fs.mkdir(path.resolve(projectPath, 'src', 'services'), { recursive: true });
        await fs.mkdir(path.resolve(projectPath, 'src', 'commands'), { recursive: true });

        await fs.writeFile(path.resolve(projectPath, '.ydf.config.js'), 'import { ConfigBuilder } from \'ydf\';\n\nexport default new ConfigBuilder ({ session ({ usedIntents, usedPartials }) { return { intents: usedIntents, partials: usedPartials, token: \'BOT TOKEN\' }; } });\n');
    });

cli
    .command('deploy', 'Deploy the framework')

    .option('-c, --config-path <path>', 'Config file path', { default: '.ydf.config.js' })

    .action(async ({ configPath }) => {

        (await import('../index.js')).default(

            (await import(`file:///${ path.resolve(configPath) }`)).default
        );
    });

cli.parse();
