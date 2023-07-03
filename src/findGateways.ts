import { EventsUsed } from './structs/Util.js';
import { EventBuilder } from './structs/Event.js';

export default function (loadedEvents: EventBuilder[], usedEvents: EventsUsed) {

    let usedIntents = 0;

    let usedPartials: number[] = [];

    for (const loadedEvent of loadedEvents) {

        if (!usedEvents[loadedEvent.name]) continue;

        usedIntents |= loadedEvent.intents;

        usedPartials = usedPartials.concat(loadedEvent.partials);

        for (const loadedFile of usedEvents[loadedEvent.name].all) {

            usedIntents |= loadedFile.intents;

            usedPartials = usedPartials.concat(loadedFile.partials);
        }
    }

    return { usedIntents, usedPartials };
}
