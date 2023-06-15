import { EventBuilder } from './struc/Event.js';

import { UsedEvents } from './struc/Util.js';

export default function (loadedEvents: EventBuilder[], usedEvents: UsedEvents) {

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
