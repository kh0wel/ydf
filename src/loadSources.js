import fs from 'node:fs/promises';
import path from 'node:path';

const loader = async function (directory, target, Builder) {

    let files = [];

    const items = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    for (const item of items) {

        const stat = await fs.stat(path.join(directory, item));

        if (stat.isDirectory()) {

            files = files.concat(await loader(path.join(directory, item), target, Builder));

            continue;
        }

        if (item.endsWith(target)) {

            const { default: data } = await import(`file:///${ path.join(directory, item) }`);

            files.push(

                new Builder({

                    ... data,

                    name: item.slice(0, item.length - target.length),

                    path: path.join(directory, item)
                })
            );

            break;
        }
    }

    return files;
}

export default loader;
