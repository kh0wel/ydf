import discord from 'discord.js';

import EventBuilder from './builders/EventBuilder.js';

export default [

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
    })
];
