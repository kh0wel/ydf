import discord from 'discord.js';

export default {

    priority: 1,

    execute ({

        client,

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

            for (const data of usedEvents.get(this.name).commands) {

                // Si el tipo del comando no tiene es del mismo tipo
                if (event.commandType !== data.type) continue;

                // Si el nombre del comando no tiene el mismo nombre
                if (event.commandName !== data.display.name.default) continue;

                data.events[this.name]({

                    client, event,

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
};
