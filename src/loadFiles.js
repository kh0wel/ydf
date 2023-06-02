import fs from 'node:fs/promises';
import path from 'node:path';

export default async function (directory, Builder) {

    let loaded = [];

    const folders = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    for (const folder of folders) {

        const { default: data } = await import(`file:///${ path.join(directory, folder, 'index.js') }`);

        loaded.push(new Builder({ ... data, name: folder }));
    }

    loaded = loaded.sort((a, b) => a.level - b.level);

    return loaded;
}
