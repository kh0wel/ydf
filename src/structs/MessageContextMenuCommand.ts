import { BaseOptions, BaseBuilder } from './Base.js';
import { HandledEvents, CommandLocalizations, CommandPermissions, DataFrom } from './Util.js';

export interface MessageContextMenuCommandDisplay {

    type: number;

    name: CommandLocalizations;

    permissions?: CommandPermissions;
}

export interface MessageContextMenuCommandOptions extends BaseOptions {

    display: Omit<MessageContextMenuCommandDisplay, 'type'>;

    events: HandledEvents
}

export class MessageContextMenuCommandBuilder extends BaseBuilder {

    from = DataFrom.MESSAGE_CONTEXT_MENU_COMMAND;

    display: Required<MessageContextMenuCommandDisplay> = {

        // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
        type: 3,

        name: { default: null! },

        permissions: {

            member: null,

            dm: false, nsfw: false
        }
    };

    events: HandledEvents = null!;

    constructor (options: MessageContextMenuCommandOptions) {

        super (options);

        this.display.name = options.display.name;

        this.display.permissions.member = options.display.permissions?.member ?? this.display.permissions.member;
        this.display.permissions.dm     = options.display.permissions?.dm     ?? this.display.permissions.dm;
        this.display.permissions.nsfw   = options.display.permissions?.nsfw   ?? this.display.permissions.nsfw;

        this.events = options.events;
    }
}
