import { EventBuilder } from './struc/Event.js';

import findEvents from './findEvents.js';

export default function (loadedEvents: EventBuilder[], usedEvents: ) {

    let usedIntents = 0;

    for (const loadedEvent of loadedEvents) {

        if (!usedEvents[loadedEvent.name]) continue;

        usedIntents |= loadedEvent.intents;

        for (const loadedFile of usedEvents[loadedEvent.name].all) {

            usedIntents |= loadedFile.intents;
        }
    }

    return { usedIntents };
}
