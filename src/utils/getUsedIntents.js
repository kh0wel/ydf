export default function (loadedEvents, usedEvents) {

    let usedIntents = 0;

    for (const loadedEvent of loadedEvents) {

        // Si el evento no es utilizado, lo ignora
        if (!usedEvents[loadedEvent.name]) continue;

        usedIntents |= loadedEvent.intents;

        for (const loadedFile of usedEvents[loadedEvent.name].all) {

            usedIntents |= loadedFile.intents;
        };
    };

    return usedIntents;
};
