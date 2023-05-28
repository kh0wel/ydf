import path from 'node:path';
import readline from 'node:readline/promises';

import { exec } from 'node:child_process';

switch (process.argv.at(2)) {

    case 'init':

        const cli = readline.createInterface({

            input:  process.stdin,
            output: process.stdout,
        });

        await cli.question('Project name: (new-yotrd-project) ')

            .then((name) => {

                exec(`git clone https://github.com/yotrd/template.git ${

                    name.length

                        ? name

                        : 'new-yotrd-project'
                }`);

                cli.close();
            });

        console.log('Read the documentation on https://github.com/yotrd/core');

        break;

    case 'deploy':

        const config = await import(`file:///${ path.join(process.cwd(), '.yotrd.config.js') }`);

        (await import('@yotrd/core'))(config.default);

        break;
};
