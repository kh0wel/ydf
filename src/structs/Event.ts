import { EventCallback } from './Util.js';
import { BaseOptions, BaseBuilder } from './Base.js';

export interface EventOptions extends BaseOptions {

    /**
     * Function to execute (on deployment).
     */
    deploy: EventCallback;
}

export class EventBuilder extends BaseBuilder {

    /**
     * Function to execute (on deployment).
     */
    deploy: EventCallback = null!;

    constructor (options: EventOptions) {

        super (options);

        Object.assign(this, { deploy: options.deploy });
    }
}
