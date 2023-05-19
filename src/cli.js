import fs from 'node:fs/promises';
import path from 'node:path';

if (!await import('discord.js')) throw new Error('Please, install discord.js');

switch (process.argv.at(2)) {

    case 'init':

        console.log('Coming soon');

        console.log('Read docs on https://github.com/nard');

        break;

    case 'deploy':

        console.log('Coming soon');

        break;
};
