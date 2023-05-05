import fs from 'node:fs/promises';
import path from 'node:path';

import environment from './environment.js';

if (!await import('discord.js')) throw new Error('discord.js dependence no installed');

switch (process.argv.at(2)) {

    case 'deploy':

        try {

            await environment((await import(`file:///${ path.resolve(process.cwd(), '.voart.config.js') }`)).default);
        } catch {

            throw new Error('Invalid config file');
        };

        break;

    case 'init':

        try {

            await fs.writeFile(path.resolve(process.cwd(), '.voart.config.js'), 'export default {};');

            await fs.mkdir(path.resolve(process.cwd(), 'src', 'events'), { recursive: true });
            await fs.mkdir(path.resolve(process.cwd(), 'src', 'services'), { recursive: true });
    
            await fs.mkdir(path.resolve(process.cwd(), 'src', 'commands', 'chat'), { recursive: true });
            await fs.mkdir(path.resolve(process.cwd(), 'src', 'commands', 'user'), { recursive: true });
            await fs.mkdir(path.resolve(process.cwd(), 'src', 'commands', 'message'), { recursive: true });
    
            console.log('Read the docs in https://github.com/voart/discord.js');    
        } catch {

            throw new Error('Inaccessible directory');
        };

        break;
};
