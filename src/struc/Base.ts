export enum BaseType {

    EVENT                        = 0,
    SERVICE                      = 1,
    CHAT_INPUT_COMMAND           = 2,
    USER_CONTEXT_MENU_COMMAND    = 3,
    MESSAGE_CONTEXT_MENU_COMMAND = 4
}

export interface BaseOptions {

    intents?: number;
}

export class BaseBuilder {

    protected name = 'empty';
    protected path = 'empty';

    // https://discord.com/developers/docs/topics/gateway#gateway-intents
    intents = 0; 

    constructor (data: BaseOptions) {

        this.intents = data.intents ?? this.intents;
    }
}
