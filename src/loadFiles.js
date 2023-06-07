import fs from 'node:fs/promises';
import path from 'node:path';

async function loader (directory, extensions) {

    let loadedFiles = [];

    const items = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    for (const item of items) {

        const stat = await fs.stat(path.join(directory, item));

        if (stat.isDirectory()) {

            loadedFiles = loadedFiles.concat(await loader(path.join(directory, item), extensions));

            continue;
        }

        for (const extension of extensions) {

            if (!item.endsWith(extension)) continue;

            const { default: data } = await import(`file:///${ path.join(directory, item) }`);

            loadedFiles.push({

                ... data,

                metadata: {

                    name: item.slice(0, item.length - extension.length),

                    path: path.join(directory, item)
                }
            });
        }
    }

    return loadedFiles;
}

export default loader;
