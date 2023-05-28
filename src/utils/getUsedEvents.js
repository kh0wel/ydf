export default function (

    loadedEvents,
    loadedServices,
    loadedChatInputCommands,
    loadedUserContextMenuCommands,
    loadedMessageContextMenuCommands
) {

    const usedEvents = {};

    for (const loadedEvent of loadedEvents) {

        const services = loadedServices.filter((service) => service.events[loadedEvent.name]);

        const commands = loadedChatInputCommands
            .concat(loadedUserContextMenuCommands)
            .concat(loadedMessageContextMenuCommands)
            .filter((command) => command.events[loadedEvent.name]);

        const all = services.concat(commands);

        // Si el evento no es utilizado, lo ignora
        if (!all.length) continue;

        usedEvents[loadedEvent.name] = { services, commands, all };
    };

    return usedEvents;
};
