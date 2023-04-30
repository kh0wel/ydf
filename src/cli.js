import path from 'node:path';

import environment from './environment.js';

if (!await import('discord.js')) throw new Error('discord.js dependence no installed');

switch (process.argv.at(2)) {

    case 'deploy':

        const options = (await import(`file:///${ path.join(process.cwd(), '.voart.config.js') }`)).default;

        const framework = await environment(options);

        await framework.client.login(options.token);

        break;

    case 'init':

        console.log('Coming soon');

        break;
};
