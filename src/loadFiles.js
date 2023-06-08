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

            case 'event':

                loadedEvents.push({

                    ... data,

                    name: mapedFile.replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case 'service':

                loadedServices.push({

                    ... data,

                    name: mapedFile.replace(/\..+$/g, ''),

                    path: mapedFile
                });

                break;

            case 'command':

                loadedServices.push({

                    ... data,

                    name: mapedFile.replace(/\..+$/g, ''),

                    path: mapedFile
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
