import fs from 'node:fs/promises';
import path from 'node:path';

import cac from 'cac';

const cli = cac();

cli
    .command('init', 'Create a new project')

    .option('--dir <path>', 'Project directory path', { default: 'new-ydf-project' })

    .action(async (options) => {

        await fs.mkdir(path.resolve(options.path, 'src', 'events'),   { recursive: true });
        await fs.mkdir(path.resolve(options.path, 'src', 'services'), { recursive: true });
        await fs.mkdir(path.resolve(options.path, 'src', 'commands'), { recursive: true });

        await fs.writeFile(path.resolve(options.path, '.ydf.config.js'), 'import { ConfigBuilder } from \'ydf\';\n\nexport default new ConfigBuilder ({ session ({ usedIntents, usedPartials }) { return { intents: usedIntents, partials: usedPartials, token: \'BOT TOKEN\' }; } });\n');
    });

cli
    .command('deploy', 'Deploy the framework')

    .option('--config <path>', 'Config file path', { default: '.ydf.config.js' })

    .action(async ({ config: configPath }) => {

        const { default: config } = await import(`file:///${ path.resolve(configPath) }`);

        const { default: env } = await import('../index.js');

        await env(config);
    });

cli.parse();
