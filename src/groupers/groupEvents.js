export default function (

    loadedEvents,
    loadedServices,
    loadedChatInputCommands,
    loadedUserContextMenuCommands,
    loadedMessageContextMenuCommands
) {

    const usedEvents = new Map();

    for (const loadedEvent of loadedEvents) {

        const inServices = loadedServices.filter((service) => service.events[loadedEvent.name]);

        const inCommands = loadedChatInputCommands
            .concat(loadedUserContextMenuCommands)
            .concat(loadedMessageContextMenuCommands)
            .filter((command) => command.events[loadedEvent.name]);

        const inAll = inServices.concat(inCommands);

        // Si el evento no es utilizado, lo ignora
        if (!inAll.length) continue;

        usedEvents.set(loadedEvent.name, {

            services: inServices,
            commands: inCommands,
            all:      inAll
        });
    };

    return usedEvents;
};
