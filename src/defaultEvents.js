import discord from 'discord.js';

import EventBuilder from './builders/EventBuilder.js';

export default [

    // Prioridad: 0
    new EventBuilder({

        name: 'summon',

        execute ({

            config, client,
    
            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,
    
            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,
    
            usedEvents,
            usedIntents,
            usedPartials
        }) {
    
            for (const loadedFile of usedEvents[this.name].all) {
    
                loadedFile.events[this.name]({
    
                    config, client,
    
                    eventsPath,
                    servicesPath,
                    chatInputCommandsPath,
                    userContextMenuCommandsPath,
                    messageContextMenuCommandsPath,
    
                    loadedEvents,
                    loadedServices,
                    loadedChatInputCommands,
                    loadedUserContextMenuCommands,
                    loadedMessageContextMenuCommands,
    
                    usedEvents,
                    usedIntents,
                    usedPartials
                });
            };
        }
    }),

    // Prioridad: 1
    new EventBuilder({

        name: 'clientReady',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.ClientReady, () => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    // Prioridad: 2
    new EventBuilder({

        name: 'debug',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.Debug, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    new EventBuilder({

        name: 'error',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.Error, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    new EventBuilder({

        name: 'warn',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.Warn, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    // Prioridad: 3
    new EventBuilder({

        name: 'interactionCommand',

        execute ({

            config, client,
    
            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,
    
            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,
    
            usedEvents,
            usedIntents,
            usedPartials
        }) {
    
            client.on(discord.Events.InteractionCreate, (event) => {
    
                // Si la interaccion no es de un comando
                if (!event.isCommand()) return;
    
                for (const loadedCommand of usedEvents[this.name].commands) {
    
                    // Si el tipo del comando no tiene es del mismo tipo
                    if (event.commandType !== loadedCommand.type) continue;
    
                    // Si el nombre del comando no tiene el mismo nombre
                    if (event.commandName !== loadedCommand.display.name.default) continue;
    
                    loadedCommand.events[this.name]({
    
                        config, client, event,
    
                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,
    
                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,
    
                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
    
                    break;
                };
            });
        }
    }),

    // Prioridad: 4
    new EventBuilder({

        name: 'channelCreate',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.ChannelCreate, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    new EventBuilder({

        name: 'channelDelete',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.ChannelDelete, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    new EventBuilder({

        name: 'guildCreate',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.GuildCreate, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    new EventBuilder({

        name: 'guildDelete',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.GuildDelete, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    new EventBuilder({

        name: 'guildBanAdd',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.GuildBanAdd, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    new EventBuilder({

        name: 'guildBanRemove',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.GuildBanRemove, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    new EventBuilder({

        name: 'guildRoleCreate',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.GuildRoleCreate, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    new EventBuilder({

        name: 'guildRoleDelete',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.GuildRoleDelete, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    new EventBuilder({

        name: 'guildScheduledEventCreate',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.GuildScheduledEventCreate, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    new EventBuilder({

        name: 'guildScheduledEventDelete',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.GuildScheduledEventDelete, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    new EventBuilder({

        name: 'guildStickerCreate',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.GuildStickerCreate, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    new EventBuilder({

        name: 'guildStickerDelete',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.GuildStickerDelete, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    new EventBuilder({

        name: 'messageCreate',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.MessageCreate, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    }),

    new EventBuilder({

        name: 'mssageDelete',

        execute ({

            config, client,

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents,
            usedPartials
        }) {

            client.on(discord.Events.MessageDelete, (event) => {

                for (const loadedFile of usedEvents[this.name].all) {

                    loadedFile.events[this.name]({

                        config, client, event,

                        eventsPath,
                        servicesPath,
                        chatInputCommandsPath,
                        userContextMenuCommandsPath,
                        messageContextMenuCommandsPath,

                        loadedEvents,
                        loadedServices,
                        loadedChatInputCommands,
                        loadedUserContextMenuCommands,
                        loadedMessageContextMenuCommands,

                        usedEvents,
                        usedIntents,
                        usedPartials
                    });
                };
            });
        }
    })
];
