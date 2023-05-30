import fs from 'node:fs/promises';
import path from 'node:path';

async function loader (directory, Builder) {

    let used = [];

    const items = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    for (const item of items) {

        const itemPath = path.join(directory, item);

        const { isDirectory } = await fs.stat(itemPath);

        if (isDirectory()) {

            used = used.concat(await loader(itemPath, Builder));

            continue;
        };

        if (item.startsWith('main')) {

            const { default: data } = await import(`file:///${ itemPath }`);

            used.push(new Builder({ ...data, name: item }));

            break;
        };
    };

    return used;
};

export default loader;
