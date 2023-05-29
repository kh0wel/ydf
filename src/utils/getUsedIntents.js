export default function (loadedEvents, usedEvents) {

    let used = 0;

    for (const loadedEvent of loadedEvents) {

        // Si el evento no es utilizado, lo ignora
        if (!usedEvents[loadedEvent.name]) continue;

        used |= loadedEvent.intents;

        for (const loadedFile of usedEvents[loadedEvent.name].all) {

            used |= loadedFile.intents;
        };
    };

    return used;
};
