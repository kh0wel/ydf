import { BaseOptions, BaseBuilder } from './Base.js';
import { DataFrom, HandledEvents } from './Util.js';

export interface ServiceOptions extends BaseOptions {

    /**
     * Necessary events (using their file name with excluded extensions)
     */
    events: HandledEvents
}

export class ServiceBuilder extends BaseBuilder {

    from = DataFrom.SERVICE;

    /**
     * Necessary events (using their file name with excluded extensions)
     */
    events: HandledEvents = null!;

    constructor (options: ServiceOptions) {

        super (options);

        this.events = options.events;
    }
}
