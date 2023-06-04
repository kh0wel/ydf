export default function (laodedEvents, usedEvents) {

    let usedIntents = 0;

    for (const loadedEvent of laodedEvents) {

        if (!usedEvents[loadedEvent.name]) continue;

        usedIntents |= loadedEvent.intents;

        for (const loadedFile of usedEvents[loadedEvent.name].all) {

            usedIntents |= loadedFile.intents;
        }
    }

    return { usedIntents };
}
