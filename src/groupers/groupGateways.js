export default function (loadedEvents, usedEvents) {

    const usedGateways = { intents: [], partials: [] };

    for (const loadedEvent of loadedEvents) {

        // Si el evento no es utilizado, lo ignora
        if (!usedEvents.has(loadedEvent.name)) continue;

        usedGateways.intents  = usedGateways.intents.concat(loadedEvent.intents);
        usedGateways.partials = usedGateways.partials.concat(loadedEvent.partials);

        for (const data of usedEvents.get(loadedEvent.name).all) {

            usedGateways.intents  = usedGateways.intents.concat(data.intents);
            usedGateways.partials = usedGateways.partials.concat(data.partials);
        };
    };

    return usedGateways;
};
