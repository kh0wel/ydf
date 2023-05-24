export default function (loadedEvents, usedEvents) {

    let usedPartials = [];

    for (const loadedEvent of loadedEvents) {

        // Si el evento no es utilizado, lo ignora
        if (!usedEvents[loadedEvent.name]) continue;

        usedPartials = usedPartials.concat(loadedEvent.partials);

        for (const loadedFile of usedEvents[loadedEvent.name].all) {

            usedPartials = usedPartials.concat(loadedFile.partials);
        };
    };

    return usedPartials;
};
