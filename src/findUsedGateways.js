export default function (loadedEvents, usedEvents) {

    let usedIntents = 0;

    for (const loadedEvent of loadedEvents) {

        if (!usedEvents[loadedEvent.metadata.name]) continue;

        usedIntents |= loadedEvent.intents;

        for (const loadedFile of usedEvents[loadedEvent.metadata.name].all) {

            usedIntents |= loadedFile.intents;
        }
    }

    return { usedIntents };
}
