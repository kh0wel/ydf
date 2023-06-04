export default function (loadedFiles, usedEvents) {

    const gateways = { intents: 0 };

    for (const loadedEvent of loadedFiles.events) {

        if (!usedEvents[loadedEvent.name]) continue;

        gateways.intents |= loadedEvent.intents;

        for (const loadedFile of usedEvents[loadedEvent.name].all) {

            gateways.intents |= loadedFile.intents;
        }
    }

    return gateways;
}
