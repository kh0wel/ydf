export default function ({ loadedEvents, usedEvents }) {

    let usedPartials = [];

    for (const loadedEvent of loadedEvents) {

        // Si el evento no es utilizado, lo ignora
        if (!usedEvents.has(loadedEvent.name)) continue;

        usedPartials = usedPartials.concat(loadedEvent.partials);

        for (const data of usedEvents.get(loadedEvent.name).all) {

            usedPartials = usedPartials.concat(data.partials);
        };
    };

    return usedPartials;
};
