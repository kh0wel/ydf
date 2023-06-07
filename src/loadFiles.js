import fs from 'node:fs/promises';
import path from 'node:path';

async function loader (directory, target) {

    let loadedFiles = [];

    const items = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    for (const item of items) {

        const stat = await fs.stat(path.join(directory, item));

        if (stat.isDirectory()) {

            loadedFiles = loadedFiles.concat(await loader(path.join(directory, item), target));

            continue;
        }

        if (item.includes(target)) {

            const { default: data } = await import(`file:///${ path.join(directory, item) }`);

            loadedFiles.push({

                ... data,

                name: item.slice(item.length - target.length),

                path: path.join(directory, item)
            });

            break;
        }
    }

    return loadedFiles;
}

export default loader;
