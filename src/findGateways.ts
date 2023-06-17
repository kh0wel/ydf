import { EventBuilder } from './structs/Event.js';
import { LoadedFile, EventsGroup } from './structs/Util.js';

export default function (loadedEvents: LoadedFile<EventBuilder>[], usedEvents: EventsGroup) {

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
