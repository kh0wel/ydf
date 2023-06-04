export default function (loadedFiles) {

    const events = {};

    for (const loadedEvent of loadedFiles.events) {

        const byServices = loadedFiles.services.filter((data) => data.events[loadedEvent.name]);

        const byCommands = loadedFiles.commands.chat
            .concat(loadedFiles.commands.user)
            .concat(loadedFiles.commands.message)
            .filter((data) => data.events[loadedEvent.name]);

        const byAll = byServices.concat(byCommands);

        if (!byAll.length) continue;

        events[loadedEvent.name] = {

            services: byServices,
            commands: byCommands,
            all:      byAll
        };
    }

    return events;
}
