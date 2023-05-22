import fs from 'node:fs/promises';
import path from 'node:path';

const searcher = async (directory, target, Builder) => {

    const directoryItems = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    let loadedFiles = [];

    for (const item of directoryItems) {

        const itemStat = await fs.stat(path.resolve(directory, item));

        // Si es un directorio
        if (itemStat.isDirectory()) {

            loadedFiles = loadedFiles.concat(await searcher(path.resolve(directory, item)));

            continue;
        };

        // Si no es un archivo objetivo
        if (!target.includes(item)) continue;

        const data = await import(`file:///${ path.resolve(directory, item) }`);

        loadedFiles.push(new Builder({ ...data.default, name: item }));

        break;
    };

    return loadedFiles;
};

export default searcher;