import fs from 'node:fs/promises';
import path from 'node:path';

import cac from 'cac';

const cli = cac();

cli
    .command('init', 'Create a new project')

    .option('--dir <path>', 'Project directory path', { default: 'new-ydf-project' })

    .action(async ({ dir: dirPath }) => {

        await fs.mkdir(path.resolve(dirPath, 'src', 'events'),   { recursive: true });
        await fs.mkdir(path.resolve(dirPath, 'src', 'services'), { recursive: true });
        await fs.mkdir(path.resolve(dirPath, 'src', 'commands'), { recursive: true });

        await fs.writeFile(path.resolve(dirPath, '.ydf.config.js'), 'import { ConfigBuilder } from \'ydf\';\n\nexport default new ConfigBuilder ({ session ({ usedIntents, usedPartials }) { return { intents: usedIntents, partials: usedPartials, token: \'BOT TOKEN\' }; } });\n');
    });

cli
    .command('deploy', 'Deploy the framework')

    .option('--config <path>', 'Config file path', { default: '.ydf.config.js' })

    .action(async ({ config: configPath }) => {

        const { default: configContent } = await import(`file:///${ path.resolve(configPath) }`);

        const { default: env } = await import('../index.js');

        await env(configContent);
    });

cli.parse();
