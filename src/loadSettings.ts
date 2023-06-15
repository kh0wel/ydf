import fs from 'fs/promises';

export default async function (settingsPath: string) {

    return fs.readFile(settingsPath, 'utf-8');
}
