import discord from 'discord.js';

import deleteProperty from '../utils/deleteProperty.js';

export default class {

    name = undefined;

    type = discord.ApplicationCommandType.Message;

    level = 0;

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

    constructor (data) {

        this.name = data.name;

        this.level    = data.level    ?? this.level;
        this.intents  = data.intents  ?? this.intents;
        this.partials = data.partials ?? this.partials;

        this.display = {

            name: data.display.name,

            permissions: {

                member: data.display.permissions?.member ?? this.display.permissions.member,
                dm:     data.display.permissions?.dm     ?? this.display.permissions.dm,
                nsfw:   data.display.permissions?.nsfw   ?? this.display.permissions.nsfw
            },

            data: {

                name: data.display.name.default,

                name_localizations: deleteProperty(data.display.name, 'default'),

                default_member_permissions: data.display.permissions?.member ?? this.display.data.default_member_permissions,
                dm_permission:              data.display.permissions?.dm     ?? this.display.data.dm_permission,
                nsfw:                       data.display.permissions?.nsfw   ?? this.display.data.nsfw
            }
        };

        this.events = data.events;
    };
};
