export default function ({ loadedEvents, usedEvents }) {

    let usedIntents = [];

    for (const loadedEvent of loadedEvents) {

        // Si el evento no es utilizado, lo ignora
        if (!usedEvents.has(loadedEvent.name)) continue;

        usedIntents = usedIntents.concat(loadedEvent.intents);

        for (const data of usedEvents.get(loadedEvent.name).all) {

            usedIntents = usedIntents.concat(data.intents);
        };
    };

    return usedIntents;
};
