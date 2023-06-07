import fs from 'node:fs/promises';
import path from 'node:path';

async function loader (directory, extension) {

    let loadedFiles = [];

    const items = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    for (const item of items) {

        const stat = await fs.stat(path.join(directory, item));

        if (stat.isDirectory()) {

            loadedFiles = loadedFiles.concat(await loader(path.join(directory, item), extension));

            continue;
        }

        if (item.endsWith(extension)) {

            const { default: data } = await import(`file:///${ path.join(directory, item) }`);

            loadedFiles.push({

                ... data,

                metadata: {

                    name: item.slice(0, item.length - extension.length),

                    path: path.join(directory, item)
                }
            });

            break;
        }
    }

    return loadedFiles;
}

export default loader;
