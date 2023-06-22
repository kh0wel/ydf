import path from 'node:path';

import fglob from 'fast-glob';

export default async function (

    target: string[],
    ignore: string[],

    Builder: any
) {

    const loadedFiles: typeof Builder[] = [];

    const mapedFiles = await fglob(target, { ignore, dot: true, absolute: true });

    for (const mapedFile of mapedFiles) {

        const { default: data } = await import(`file:///${ mapedFile }`);

        loadedFiles.push({

            ... data,

            name: path.basename(mapedFile).replace(/\..+$/g, ''),

            path: mapedFile
        });
    }

    return loadedFiles;
}
