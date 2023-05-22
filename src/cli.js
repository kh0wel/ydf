import fs from 'node:fs/promises';
import path from 'node:path';

import env from './env.js';

if (!await import('discord.js')) throw new Error('Please, install discord.js');

switch (process.argv.at(2)) {

    case 'init':

        fs.mkdir(path.join(process.cwd(), 'src', 'events'),              { recursive: true });
        fs.mkdir(path.join(process.cwd(), 'src', 'services'),            { recursive: true });
        fs.mkdir(path.join(process.cwd(), 'src', 'commands', 'chat'),    { recursive: true });
        fs.mkdir(path.join(process.cwd(), 'src', 'commands', 'user'),    { recursive: true });
        fs.mkdir(path.join(process.cwd(), 'src', 'commands', 'message'), { recursive: true });

        fs.writeFile(path.join(process.cwd(), '.nard.config.js'), 'export default {};');

        console.log('Now, read the documentation on https://github.com/nard');

        break;

    case 'deploy':

        const config = await import(`file:///${ path.join(process.cwd(), '.nard.config.js') }`);

        env(config.default);

        break;
};
