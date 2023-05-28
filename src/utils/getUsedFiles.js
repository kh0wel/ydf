import fs from 'node:fs/promises';
import path from 'node:path';

export default async function (directory, Builder) {

    let usedFiles = [];

    for (const folder of (await fs.readdir(directory, 'utf-8')).filter((name) => !name.startsWith('.'))) {

        usedFiles.push(
            
            new Builder({
                
                ... (await import(`file:///${ path.join(directory, folder, 'main.js') }`)).default,
                
                name: folder
            })
        );
    };

    // Ordena los archivos de mayor a menor segun su nivel
    usedFiles = usedFiles.sort((a, b) => a.level - b.level);

    return usedFiles;
};
