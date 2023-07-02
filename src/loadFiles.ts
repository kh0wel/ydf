import path from 'node:path';

import glob from 'tiny-glob';

export default async function (target: string, cwd: string) {

    const loadedFiles: any[] = [];

    const mapedFiles = await glob(target, { cwd, dot: true, absolute: true });

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