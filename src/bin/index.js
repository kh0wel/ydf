import fs from 'node:fs/promises';
import path from 'node:path';

switch (process.argv.at(2)) {

    case 'init': {

        const folder = process.argv.at(3) ?? 'new-ydf-project';

        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'events'),   { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'services'), { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'commands'), { recursive: true });

        await fs.writeFile(path.join(process.cwd(), folder, '.ydfrc'), 'import { SettingsBuilder } from \'ydf\';\n\nexport default new SettingsBuilder ({ session ({ usedIntents, usedPartials }) { return { intents: usedIntents, partials: usedPartials, token: \'BOT TOKEN\' }; } });\n');

        break;
    }

    case 'deploy': {

        const { default: settings } = await import(`file:///${ path.resolve(process.argv.at(3) ?? '.ydfrc') }`);

        const { default: environment } = await import('../index.js');

        await environment(settings);

        break;
    }

    default:

        console.log('Repository on https://github.com/kh0wel/ydf');

        break;
}
