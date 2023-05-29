export default function (

    loadedEvents,
    loadedServices,
    loadedChatInputCommands,
    loadedUserContextMenuCommands,
    loadedMessageContextMenuCommands
) {

    const used = {};

    for (const loadedEvent of loadedEvents) {

        const services = loadedServices.filter((data) => data.events[loadedEvent.name]);

        const commands = loadedChatInputCommands
            .concat(loadedUserContextMenuCommands)
            .concat(loadedMessageContextMenuCommands)
            .filter((data) => data.events[loadedEvent.name]);

        const all = services.concat(commands);

        // Si el evento no es utilizado, lo ignora
        if (!all.length) continue;

        used[loadedEvent.name] = { services, commands, all };
    };

    return used;
};
