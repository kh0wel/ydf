import fs from 'node:fs/promises';
import path from 'node:path';

const searcher = async (directory, targets, Builder) => {

    const directoryItems = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    let loadedFiles = [];

    for (const item of directoryItems) {

        const itemStat = await fs.stat(path.join(directory, item));

        // Si es un directorio
        if (itemStat.isDirectory()) {

            loadedFiles = loadedFiles.concat(await searcher(path.join(directory, item), targets, Builder));

            continue;
        };

        // Si no es un archivo objetivo
        if (!targets.includes(item)) continue;

        const data = await import(`file:///${ path.join(directory, item) }`);

        loadedFiles.push(new Builder({ ...data.default, name: directory.split(path.sep).at(-1) }));

        break;
    };

    return loadedFiles;
};

export default searcher;
