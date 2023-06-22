import { BaseOptions, BaseBuilder } from './Base.js';
import { BuilderFrom, HandledEvents } from './Util.js';

export interface ServiceOptions extends BaseOptions {

    events: HandledEvents
}

export class ServiceBuilder extends BaseBuilder {

    from = BuilderFrom.SERVICE;

    events: HandledEvents = null!;

    constructor (options: ServiceOptions) {

        super (options);

        this.events = options.events;
    }
}
