
import { ConfigBuilder } from './Configuration.js';
import { ServiceBuilder } from './Service.js';
import { ChatInputCommandBuilder } from './ChatInputCommand.js';
import { UserContextMenuCommandBuilder } from './UserContextMenuCommand.js';
import { MessageContextMenuCommandBuilder } from './MessageContextMenuCommand.js';

import { BaseType, BaseOptions, BaseBuilder } from './Base.js';

export interface EventOptions extends BaseOptions {

    execute ({

        config,

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedMessageContextMenuCommands,
        loadedUserContextMenuCommands,

        usedEvents,
        usedIntents
    }: {

        config: ConfigBuilder,

        loadedEvents:                     EventBuilder[],
        loadedServices:                   ServiceBuilder[],
        loadedChatInputCommands:          ChatInputCommandBuilder[],
        loadedMessageContextMenuCommands: UserContextMenuCommandBuilder[],
        loadedUserContextMenuCommands:    MessageContextMenuCommandBuilder[],

        usedEvents: {

            [event: string]: {
    
                services: ServiceBuilder[],
    
                commands: (ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder)[]
    
                all: (ServiceBuilder | ChatInputCommandBuilder | UserContextMenuCommandBuilder | MessageContextMenuCommandBuilder)[]
            }
        },

        usedIntents: number
    }): Promise<void> | void
}

export class EventBuilder extends BaseBuilder {

    type = BaseType.EVENT;

    execute;

    constructor (data: EventOptions) {

        super (data);

        this.execute = data.execute;
    }
}
