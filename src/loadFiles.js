import fs from 'node:fs/promises';
import path from 'node:path';

const loader = async (directory, Builder) => {

    let used = [];

    const items = (await fs.readdir(directory, 'utf-8')).filter((name) => name.startsWith('.'));

    for (const item of items) {

        const { isDirectory } = await fs.stat(path.join(directory, item));

        if (isDirectory()) {

            used = used.concat(await loader(path.join(directory, item), Builder));

            continue;
        };

        if (item.startsWith('index')) {

            const { default: data } = await import(`file:///${ path.join(directory, item) }`);

            used.push(new Builder({ ...data, name: directory.split(path.sep).at(-1) }));
    
            break;
        };
    };
};

export default loader;
