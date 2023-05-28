import path from 'node:path';
import readline from 'node:readline/promises';

import { execSync } from 'node:child_process';

switch (process.argv.at(2)) {

    case 'init':

        const cli = readline.createInterface({

            input:  process.stdin,
            output: process.stdout,
        });

        await cli.question('Project name: (new-yotrd-project) ')

            .then((name) => {

                cli.close();

                name ||= 'new-yotrd-project';

                execSync(`git clone --depth=1 https://github.com/yotrd/template.git ${ name }`);

                switch (process.platform) {

                    case 'win32':

                        execSync(`rmdir -r -Force ${ path.join(process.cwd(), name, '.git') }`);

                        break;

                    default:

                        execSync(`rmdir -rf ${ path.join(process.cwd(), name, '.git') }`);

                        break;
                };
            });

        console.log('Read the documentation on https://github.com/yotrd/core');

        break;

    case 'deploy':

        const config = await import(`file:///${ path.join(process.cwd(), '.yotrd.config.js') }`);

        (await import('@yotrd/core'))(config.default);

        break;
};
