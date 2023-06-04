export default function (loadedEvents, usedEvents) {

    let intents = 0;

    for (const loadedEvent of loadedEvents) {

        if (!usedEvents[loadedEvent.name]) continue;

        intents |= loadedEvent.intents;

        for (const loadedFile of usedEvents[loadedEvent.name].all) {

            intents |= loadedFile.intents;
        }
    }

    return intents;
}
