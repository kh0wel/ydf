import { stat, readdir as readDirectory } from 'node:fs/promises';
import { join          as joinPath      } from 'node:path';

async function loader (directory, Builder) {

    let loaded = [];

    const items = (await readDirectory(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    for (const item of items) {

        const path = joinPath(directory, item);

        const { isDirectory } = await stat(path);

        if (isDirectory()) {

            loaded = loaded.concat(await loader(path, Builder));

            continue;
        };

        if (item.startsWith('main')) {

            const { default: data } = await import(`file:///${ path }`);

            loaded.push(new Builder({ ...data, name: item }));

            break;
        };
    };

    return loaded;
};

export default loader;
