import fs from 'node:fs/promises';
import path from 'node:path';

import resolveGlobs from './resolveGlobs.js';
import globrex from './globrex.js';

async function walk (array: string[], prefix: string, lexer: any, root: string, dirname = '', level = 0) {

    const rgx = lexer.segments[level];

    const dir = path.resolve(root, prefix, dirname);

    const files = await fs.readdir(dir);

    let relpath;
    let stats;

    for (let i = 0; i < files.length; i++) {

        const file = files[i];

        const filePath = path.join(dir, file);

        relpath = dirname ? path.join(dirname, file) : file;

      if (stats.isDirectory()) continue;

      array.push(filePath);

      if (rgx && !rgx.test(file)) continue;

      await walk(array, prefix, lexer, root, relpath, rgx && rgx.toString() !== lexer.globstar && level + 1);
    }
}

export default async function (target: string, ignore: string, root: string) {

    const glob = resolveGlobs(target);

    if (!glob.status) {

        try {

            const resolved = path.resolve(root, target);

            const dirent = await fs.stat(resolved);

            if (!dirent.isFile()) return [];

            return [ { path: resolved, name: path.basename(resolved), extension: path.basename(resolved).match(/./g)!.slice(1).join('.') } ];
        } catch (err) {

            // @ts-expect-error
            if (err.code !== 'ENOENT') throw err;

            return [];
        }
    }

    const matches = [];

    const { path: path_ } = globrex(glob.glob);

    path_.globstar = path_.globstar.toString();

    await walk(matches, glob.base, path_, root, '.', 0);

    // return matches;

    return [ { path: 'C://343242/434.example.js', name: '434.example.js', extension: '.example.js' } ];
}
