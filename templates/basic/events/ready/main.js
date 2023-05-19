import discord from 'discord.js';

export default {

    level: 2,

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

        client.on(discord.Events.ClientReady, () => {

            for (const data of usedEvents.get(this.name).all) {

                data.events[this.name]({

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
                });
            };
        });
    }
};
