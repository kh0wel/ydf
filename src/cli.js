import fs from 'node:fs/promises';
import path from 'node:path';

import deployment from './deployment.js';

if (!await import('discord.js')) throw new Error('Please, install discord.js');

console.log('Remember, this is an unstable project');

switch (process.argv.at(2)) {

    case 'init':

        await fs.mkdir(path.resolve(process.cwd(), 'src', 'layouts'),             { recursive: true });
        await fs.mkdir(path.resolve(process.cwd(), 'src', 'events'),              { recursive: true });
        await fs.mkdir(path.resolve(process.cwd(), 'src', 'services'),            { recursive: true });
        await fs.mkdir(path.resolve(process.cwd(), 'src', 'commands', 'chat'),    { recursive: true });
        await fs.mkdir(path.resolve(process.cwd(), 'src', 'commands', 'user'),    { recursive: true });
        await fs.mkdir(path.resolve(process.cwd(), 'src', 'commands', 'message'), { recursive: true });

        await fs.writeFile(path.resolve(process.cwd(), '.nard.config.js'), 'export default {};');

        console.log('Now, read the documentation on https://github.com/nard');

        break;

    case 'deploy':

        const config = await import(`file:///${ path.resolve(process.cwd(), '.nard.config.js') }`);

        await deployment(config.default);

        break;
};
