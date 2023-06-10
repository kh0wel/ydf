import fs from 'node:fs/promises';
import path from 'node:path';

import cac from 'cac';

import { ConfigBuilder } from '../struc/Configuration.js';

const cli = cac();

cli
    .command('init', 'Create a new project')

    .option('--dir <path>', 'Project directory path', { default: 'new-ydf-project' })

    .action(async ({ dir }) => {

        await fs.mkdir(path.resolve(dir, 'src', 'events'),   { recursive: true });
        await fs.mkdir(path.resolve(dir, 'src', 'services'), { recursive: true });
        await fs.mkdir(path.resolve(dir, 'src', 'commands'), { recursive: true });

        await fs.writeFile(path.resolve(dir, '.ydf.config.js'), 'import { ConfigBuilder } from \'ydf\';\n\nexport default new ConfigBuilder ({ session ({ usedIntents, usedPartials }) { return { intents: usedIntents, partials: usedPartials, token: \'BOT TOKEN\' }; } });\n');
    });

cli
    .command('deploy', 'Deploy the framework')

    .option('--config <path>', 'Config file path', { default: '.ydf.config.js' })

    .action(async ({ config }) => {

        (await import('../index.js')).default(

            (await import(`file:///${ path.resolve(config) }`)).default as ConfigBuilder
        );
    });

cli.parse();
