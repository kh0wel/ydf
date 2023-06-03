import fs from 'node:fs/promises';
import path from 'node:path';

const loader = async function (directory, target, Builder) {

    let loaded = [];

    const items = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    for (const item of items) {

        const { isDirectory } = await fs.stat(path.join(directory, item));

        if (isDirectory()) {

            loaded = loaded.concat(await loader(path.join(directory, item), target, Builder));

            continue;
        }

        if (item.endsWith(target)) {

            const { default: data } = await import(`file:///${ path.join(directory, item) }`);

            loaded.push(new Builder({ ... data, directory, name: item.slice(item.length - target.length) }));

            break;
        }
    }

    return loaded;
}

export default loader;
