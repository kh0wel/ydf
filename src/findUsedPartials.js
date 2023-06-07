export default function (loadedEvents, usedEvents) {

    let usedPartials = [];

    for (const loadedEvent of loadedEvents) {

        if (!usedEvents[loadedEvent.metadata.name]) continue;

        usedPartials = usedPartials.concat(loadedEvent.partials);

        for (const loadedFile of usedEvents[loadedEvent.metadata.name].all) {

            usedPartials = usedPartials.concat(loadedFile.partials);
        }
    }

    return usedPartials;
}
