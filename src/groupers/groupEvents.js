export default function (

    loadedEvents,
    loadedServices,
    loadedChatInputCommands,
    loadedUserContextMenuCommands,
    loadedMessageContextMenuCommands
) {

    const usedEvents = {};

    for (const loadedEvent of loadedEvents) {

        const byServices = loadedServices.filter((service) => service.events[loadedEvent.name]);

        const byCommands = loadedChatInputCommands
            .concat(loadedUserContextMenuCommands)
            .concat(loadedMessageContextMenuCommands)
            .filter((command) => command.events[loadedEvent.name]);

        const byAll = byServices.concat(byCommands);

        // Si el evento no es utilizado, lo ignora
        if (!byAll.length) continue;

        usedEvents[loadedEvent.name] = {

            services: byServices,
            commands: byCommands,
            all:      byAll
        };
    };

    return usedEvents;
};
