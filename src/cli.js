import fs from 'node:fs/promises';
import path from 'node:path';

import environment from './environment.js';

if (!await import('discord.js')) throw new Error('discord.js dependence no installed');

switch (process.argv.at(2)) {

    case 'deploy':

        await environment((await import(`file:///${ path.join(process.cwd(), '.voart.config.js') }`)).default);

        break;

    case 'init':

        await fs.writeFile(path.join(process.cwd(), '.voart.config.js'), 'export default {};');

        await fs.mkdir(path.join(process.cwd(), 'src', 'events'), { recursive: true });
        await fs.mkdir(path.join(process.cwd(), 'src', 'services'), { recursive: true });

        await fs.mkdir(path.join(process.cwd(), 'src', 'commands', 'chat'), { recursive: true });
        await fs.mkdir(path.join(process.cwd(), 'src', 'commands', 'user'), { recursive: true });
        await fs.mkdir(path.join(process.cwd(), 'src', 'commands', 'message'), { recursive: true });

        break;
};
