import { BaseOptions, BaseBuilder } from './Base.js';

import {

    HandledEvents,
    CommandLocalizations,
    CommandPermissions,
    DataFrom
}
    from './Util.js';

export interface UserContextMenuCommandDisplay {

    type: number;

    name: CommandLocalizations;

    permissions?: CommandPermissions;
}

export interface UserContextMenuCommandOptions extends BaseOptions {

    display: Omit<UserContextMenuCommandDisplay, 'type'>;

    events: HandledEvents
}

export class UserContextMenuCommandBuilder extends BaseBuilder {

    from = DataFrom.USER_CONTEXT_MENU_COMMAND;

    display: Required<UserContextMenuCommandDisplay> = {

        // https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types
        type: 2,

        name: { default: null! },

        permissions: {

            member: null,

            dm: false, nsfw: false
        }
    };

    events: HandledEvents = null!;

    constructor (options: UserContextMenuCommandOptions) {

        super (options);

        this.display.name = options.display.name;

        this.display.permissions.member = options.display.permissions?.member ?? this.display.permissions.member;
        this.display.permissions.dm     = options.display.permissions?.dm     ?? this.display.permissions.dm;
        this.display.permissions.nsfw   = options.display.permissions?.nsfw   ?? this.display.permissions.nsfw;

        this.events = options.events;
    }
}
