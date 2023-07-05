import path from 'node:path';

import cac from 'cac';

import { ConfigBuilder } from '../structs/Config.js';

// @ts-expect-error
const cli = cac();

cli
    .option('-C, --config <path>', 'Configuration file path (default ".yacf.config.js")', { default: '.yacf.config.js' })

    .action(async ({ config: configPath }) => {

        const config: ConfigBuilder = (await import(`file:///${ path.resolve(configPath) }`)).default;

        for (const plugin of config.plugins) {

            await plugin.deployer(config);
        }
    });

cli.help();

cli.parse();
