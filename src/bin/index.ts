import fs from 'node:fs/promises';
import path from 'node:path';

import cac from 'cac';

import { ConfigBuilder } from '../struc/Configuration.js';

const cli = cac();

cli
    .command('init', 'Create a new project')

    .option('--dir <path>', 'Project directory path', { default: 'new-ydf-project' })

    .action(async (params: { dir: string }) => {

        await fs.mkdir(path.resolve(params.dir, 'src', 'events'),   { recursive: true });
        await fs.mkdir(path.resolve(params.dir, 'src', 'services'), { recursive: true });
        await fs.mkdir(path.resolve(params.dir, 'src', 'commands'), { recursive: true });

        await fs.writeFile(path.resolve(params.dir, '.ydf.config.js'), 'import { ConfigBuilder } from \'ydf\';\n\nexport default new ConfigBuilder ({ session ({ usedIntents, usedPartials }) { return { intents: usedIntents, partials: usedPartials, token: \'BOT TOKEN\' }; } });\n');
    });

cli
    .command('deploy', 'Deploy the framework')

    .option('--config <path>', 'Config file path', { default: '.ydf.config.js' })

    .action(async (params: { config: string }) => {

        (await import('../index.js')).default(

            (await import(`file:///${ path.resolve(params.config) }`)).default as ConfigBuilder
        );
    });

cli.parse();
