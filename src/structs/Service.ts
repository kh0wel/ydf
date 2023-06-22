import { BaseOptions, BaseBuilder } from './Base.js';
import { DataFrom, HandledEvents } from './Util.js';

export interface ServiceOptions extends BaseOptions {

    /**
     * Used events
     */
    events: HandledEvents
}

export class ServiceBuilder extends BaseBuilder {

    from = DataFrom.SERVICE;

    /**
     * Used events
     */
    events: HandledEvents = null!;

    constructor (options: ServiceOptions) {

        super (options);

        this.events = options.events;
    }
}
