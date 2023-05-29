import { readdir } from 'node:fs/promises';
import { join    } from 'node:path';

export default async function (directory, Builder) {

    let used = [];

    const folders = (await readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    for (const folder of folders) {

        const { default: data } = await import(`file:///${ join(directory, folder, 'main.js') }`);

        used.push(new Builder({ ...data, name: folder }));
    };

    // Ordena los archivos de mayor a menor segun su nivel
    used = used.sort((a, b) => a.level - b.level);

    return used;
};
