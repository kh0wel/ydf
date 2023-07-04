import { HandledEvents, EventCallback, EventParameters } from './Util.js';
import { BaseOptions, BaseBuilder } from './Base.js';

export interface ServiceOptions extends BaseOptions {

    /**
     * Necessary events (using their file name with excluded extensions).
     */
    events: HandledEvents<EventParameters, EventCallback>;
}

export class ServiceBuilder extends BaseBuilder {

    /**
     * Necessary events (using their file name with excluded extensions).
     */
    events: HandledEvents<EventParameters, EventCallback> = null!;

    constructor (options: ServiceOptions) {

        super (options);

        Object.assign(this, { events: options.events });
    }
}
