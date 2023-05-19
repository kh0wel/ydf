import fs from 'node:fs/promises';
import path from 'node:path';

if (!await import('discord.js')) throw new Error('discord.js no installed');

switch (process.argv.at(2)) {

    case 'init':

        switch (process.argv.at(3)) {

            case 'basic':

                await fs.cp('./templates/basic', path.resolve(process.cwd(), 'src'));

                break;

            case 'complete':

                await fs.cp('./templates/complete', path.resolve(process.cwd(), 'src'));

                break;
        };

        console.log('Read the docs on https://github.com/nard');

        break;

    case 'deploy':

        break;
};
