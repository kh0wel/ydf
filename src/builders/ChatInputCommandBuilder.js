import discord from 'discord.js';

import deleteProperty from '../utils/deleteProperty.js';

export default class {

    name = undefined;

    type = discord.ApplicationCommandType.ChatInput;

    intents  = [];
    partials = [];

    display = {
        
        name:        { default: undefined },
        description: { default: undefined },

        options: [],

        permissions: {

            dm: false, nsfw: false,

            member: null
        },

        data: {

            name: undefined, description: undefined,

            name_localizations: {}, description_localizations: {},

            options: [],

            default_member_permissions: null,

            dm_permission: false, nsfw: false
        }
    };

    events = undefined;

    constructor (opt) {

        this.name = opt.name;

        this.intents  = opt.intents  ?? this.intents;
        this.partials = opt.partials ?? this.partials;

        this.display = {

            name:        opt.display.name,
            description: opt.display.description,

            options: opt.display.options ?? this.display.options,

            permissions: {

                member: opt.display.permissions?.member ?? this.display.permissions.member,
                dm:     opt.display.permissions?.dm     ?? this.display.permissions.dm,
                nsfw:   opt.display.permissions?.nsfw   ?? this.display.permissions.nsfw
            },

            data: {

                name:        opt.display.name.default,
                description: opt.display.description.default,

                name_localizations:        deleteProperty(opt.display.name, 'default'),
                description_localizations: deleteProperty(opt.display.description, 'default'),

                options: opt.display.options ?? this.display.data.options,

                default_member_permissions: opt.display.permissions?.member ?? this.display.data.default_member_permissions,
                dm_permission:              opt.display.permissions?.dm     ?? this.display.data.dm_permission,
                nsfw:                       opt.display.permissions?.nsfw   ?? this.display.data.nsfw
            }
        };

        this.events = opt.events;
    };
};
