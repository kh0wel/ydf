import path from 'node:path';

import fglob from 'fast-glob';

export default async function (include, exclude) {

    const loadedEvents                     = [];
    const loadedServices                   = [];
    const loadedChatInputCommands          = [];
    const loadedUserContextMenuCommands    = [];
    const loadedMessageContextMenuCommands = [];

    const mapedFiles = await fglob(include, {

        dot: true, absolute: true,

        ignore: exclude
    });

    for (const mapedFile of mapedFiles) {

        const { default: data } = await import(`file:///${ mapedFile }`);

        switch (data.type) {

            case 1:

                loadedEvents.push({

                    ... data,

                    metadata: {

                        name: path.basename(mapedFile).replace(/\..+$/g, ''),

                        path: mapedFile
                    }
                });

                break;

            case 2:

                loadedServices.push({

                    ... data,

                    metadata: {

                        name: path.basename(mapedFile).replace(/\..+$/g, ''),

                        path: mapedFile
                    }
                });

                break;

            case 3:

                loadedChatInputCommands.push({

                    ... data,

                    metadata: {

                        name: path.basename(mapedFile).replace(/\..+$/g, ''),

                        path: mapedFile
                    }
                });

                break;

            case 4:

                loadedUserContextMenuCommands.push({

                    ... data,

                    metadata: {

                        name: path.basename(mapedFile).replace(/\..+$/g, ''),

                        path: mapedFile
                    }
                });

                break;

            case 5:

                loadedMessageContextMenuCommands.push({

                    ... data,

                    metadata: {

                        name: path.basename(mapedFile).replace(/\..+$/g, ''),

                        path: mapedFile
                    }
                });

                break;
        }
    }

    return {

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands
    };
}
