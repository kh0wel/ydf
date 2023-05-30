export default {

    level: 1,

    execute ({

        config, session,

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
        usedIntents
    }) {

        session.events.on('interactionCreate', (interaction) => {

            for (const loadedFile of usedEvents[this.name].all) {

                loadedFile.events[this.name]({

                    config, session,

                    event: { interaction },

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
                    usedIntents
                });
            };
        });
    }
};
