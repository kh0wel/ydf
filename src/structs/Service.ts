import { HandledCallback, HandledEvents } from './Util.js';
import { BaseOptions, BaseBuilder } from './Base.js';

export interface ServiceOptions extends BaseOptions {

    /**
     * Necessary events (using their file name with excluded extensions).
     */
    events: HandledEvents<HandledCallback<any>>;
}

export class ServiceBuilder extends BaseBuilder {

    /**
     * Necessary events (using their file name with excluded extensions).
     */
    events: HandledEvents<HandledCallback<any>> = null!;

    constructor (options: ServiceOptions) {

        super (options);

        Object.assign(this, { events: options.events });
    }
}
