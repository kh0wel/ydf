import fs from 'node:fs/promises';
import path from 'node:path';

const loader = async function (directory, target, Builder) {

    let loaded = [];

    const items = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    for (const item of items) {

        const current = path.join(directory, item);

        const { isDirectory } = await fs.stat(current);

        if (isDirectory()) {

            loaded = loaded.concat(await loader(current, target, Builder));

            continue;
        }

        if (item.endsWith(target)) {

            const { default: data } = await import(`file:///${ current }`);

            loaded.push(

                new Builder({

                    ... data,

                    path: current,

                    name: item.slice(item.length - target.length),
                })
            );

            break;
        }
    }

    return loaded;
}

export default loader;
