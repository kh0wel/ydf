import fs from 'node:fs/promises';
import path from 'node:path';

async function loader (directory, Builder) {

    let loaded = [];

    const items = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    for (const item of items) {

        const on = path.join(directory, item);

        const { isDirectory } = await fs.stat(path);

        if (isDirectory()) {

            loaded = loaded.concat(await loader(on, Builder));

            continue;
        };

        if (item.startsWith('main')) {

            const { default: data } = await import(`file:///${ on }`);

            loaded.push(new Builder({ ...data, name: item }));

            break;
        };
    };

    return loaded;
};

export default loader;
