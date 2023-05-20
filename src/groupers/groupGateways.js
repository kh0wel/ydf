export default function (loadedEvents, usedEvents) {

    let usedIntents  = [];
    let usedPartials = [];

    for (const loadedEvent of loadedEvents) {

        // Si el evento no es utilizado, lo ignora
        if (!usedEvents.has(loadedEvent.name)) continue;

        usedIntents  = usedIntents.concat(loadedEvent.intents);
        usedPartials = usedPartials.concat(loadedEvent.partials);

        for (const data of usedEvents.get(loadedEvent.name).all) {

            usedIntents  = usedIntents.concat(data.intents);
            usedPartials = usedPartials.concat(data.partials);
        };
    };

    return {

        intents:  usedIntents,
        partials: usedPartials
    };
};
