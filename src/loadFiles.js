import fs from 'node:fs/promises';
import path from 'node:path';

const loader = async (directory, targets, Builder) => {

    const items = (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'));

    let loadedFiles = [];

    for (const item of items) {

        if (!path.extname(item)) {

            try {

                const loadedFile = await import(`file:///${ path.join(directory, item) }`);

                loadedFiles.push(

                    new Builder({

                        ...loadedFile.default,

                        name: directory.split(path.sep).at(-1)
                    })
                );

                break;
            } catch {

                loadedFiles = loadedFiles.concat(await loader(path.join(directory, item), targets, Builder));
            };
        };
    };

    return loadedFiles;
};

export default loader;