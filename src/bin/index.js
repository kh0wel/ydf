import fs from 'node:fs/promises';
import path from 'node:path';

switch (process.argv.at(2)) {

    case 'init': {

        const folder = process.argv.at(3) ?? 'new-ydf-project';

        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'events'),   { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'services'), { recursive: true });
        await fs.mkdir(path.join(process.cwd(), folder, 'src', 'commands'), { recursive: true });

        await fs.writeFile(path.join(process.cwd(), folder, '.ydf.config.js'), 'import { ConfigBuilder } from \'ydf\';\n\nexport default new ConfigBuilder ({\n\n\tsession ({ usedIntents, usedPartials }) {\n\n\t\treturn { intents: usedIntents, partials: usedPartials, token: \'BOT TOKEN\' };\n\t}\n});\n');

        break;
    }

    case 'deploy': {

        const { default: config } = await import(`file:///${ path.resolve(process.argv.at(3) ?? '.ydf.config.js') }`);

        (await import('../index.js')).default(config);

        break;
    }

    default:

        console.log('Repository on https://github.com/kh0wel/ydf');

        break;
}
