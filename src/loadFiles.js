import fg from 'fast-glob';

export default async function (config) {

    const loadedEvents                     = [];
    const loadedServices                   = [];
    const loadedChatInputCommands          = [];
    const loadedUserContextMenuCommands    = [];
    const loadedMessageContextMenuCommands = [];

    const mapedFiles = await fg(config.include ?? [ 'src/**/*.js' ], {

        dot: true, absolute: true,

        ignore: config.exclude
    });

    for (const mapedFile of mapedFiles) {

        const { default: data } = await import(`file:///${ mapedFile }`);

        switch (data.type) {

            case 1:

                loadedEvents.push({

                    ... data,

                    metadata: {

                        name: mapedFile.replace(/\..+$/g, ''),

                        path: mapedFile
                    }
                });

                break;

            case 2:

                loadedServices.push({

                    ... data,

                    metadata: {

                        name: mapedFile.replace(/\..+$/g, ''),

                        path: mapedFile
                    }
                });

                break;

            case 3:

                loadedChatInputCommands.push({

                    ... data,

                    metadata: {

                        name: mapedFile.replace(/\..+$/g, ''),

                        path: mapedFile
                    }
                });

                break;

            case 4:

                loadedUserContextMenuCommands.push({

                    ... data,

                    metadata: {

                        name: mapedFile.replace(/\..+$/g, ''),

                        path: mapedFile
                    }
                });

                break;

            case 5:

                loadedMessageContextMenuCommands.push({

                    ... data,

                    metadata: {

                        name: mapedFile.replace(/\..+$/g, ''),

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
