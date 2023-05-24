import discord from 'discord.js';

import deleteProperty from '../utils/deleteProperty.js';

export default class {

    name = undefined;

    type = discord.ApplicationCommandType.Message;

    intents  = [];
    partials = [];

    display = {
        
        name: { default: undefined },

        permissions: {

            dm: false, nsfw: false,

            member: null
        },

        data: {

            name: undefined,

            name_localizations: {},

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

            name: opt.display.name,

            permissions: {

                member: opt.display.permissions?.member ?? this.display.permissions.member,
                dm:     opt.display.permissions?.dm     ?? this.display.permissions.dm,
                nsfw:   opt.display.permissions?.nsfw   ?? this.display.permissions.nsfw
            },

            data: {

                name: opt.display.name.default,

                name_localizations: deleteProperty(opt.display.name, 'default'),

                default_member_permissions: opt.display.permissions?.member ?? this.display.data.default_member_permissions,
                dm_permission:              opt.display.permissions?.dm     ?? this.display.data.dm_permission,
                nsfw:                       opt.display.permissions?.nsfw   ?? this.display.data.nsfw
            }
        };

        this.events = opt.events;
    };
};
