export default function (loadedEvents, usedEvents) {

    let usedIntents = [];

    for (const loadedEvent of loadedEvents) {

        // Si el evento no es utilizado, lo ignora
        if (!usedEvents[loadedEvent.name]) continue;

        usedIntents = usedIntents.concat(loadedEvent.intents);

        for (const loadedFile of usedEvents[loadedEvent.name].all) {

            usedIntents = usedIntents.concat(loadedFile.intents);
        };
    };

    return usedIntents;
};
