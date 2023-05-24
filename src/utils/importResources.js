import fs from 'node:fs/promises';
import path from 'node:path';

export default async function (directory, Builder) {

    const loadedFiles = [];

    const priorityFolders = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    for (const priority of priorityFolders) {

        const itemFolders = (await fs.readdir(path.join(directory, priority), 'utf-8')).filter((name) => !name.startsWith('.'));

        for (const item of itemFolders) {

            const data = await import(`file:///${ path.join(directory, priority, item, 'main.js') }`);

            loadedFiles.push(new Builder({ ...data.default, name: item }));
        };
    };

    return loadedFiles;
};

