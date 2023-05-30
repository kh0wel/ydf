import fs from 'node:fs/promises';
import path from 'node:path';

async function loader (directory, Builder) {

    let loadedFiles = [];

    const items = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    for (const item of items) {

        const itemPath = path.join(directory, item);

        const { isDirectory } = await fs.stat(itemPath);

        if (isDirectory()) {

            loadedFiles = loadedFiles.concat(await loader(itemPath, Builder));

            continue;
        };

        if (item.startsWith('main')) {

            const { default: data } = await import(`file:///${ itemPath }`);

            loadedFiles.push(new Builder({ ...data, name: item }));

            break;
        };
    };

    return loadedFiles;
};

export default loader;
