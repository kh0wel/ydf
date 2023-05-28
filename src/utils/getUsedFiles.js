import fs from 'node:fs/promises';
import path from 'node:path';

export default async function (directory, Builder) {

    let usedFiles = [];

    const folders = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    for (const folder of folders) {

        const data = await import(`file:///${ path.join(directory, folder, 'main.js') }`);

        usedFiles.push(new Builder({ ...data.default, name: folder }));
    };

    // Ordena los archivos de mayor a menor segun su nivel
    usedFiles = usedFiles.sort((a, b) => a.level - b.level);

    return usedFiles;
};
