import { BaseOptions, BaseBuilder } from './Base.js';
import { HandledEvents } from './Util.js';

export interface ServiceOptions extends BaseOptions {

    events: HandledEvents
}

export class ServiceBuilder extends BaseBuilder {

    events: HandledEvents = null!;

    constructor (options: ServiceOptions) {

        super (options);

        this.events = options.events;
    }
}
