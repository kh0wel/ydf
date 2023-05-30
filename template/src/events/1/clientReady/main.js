export default {

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

        session.events.once('ready', () => {

            for (const loadedFile of usedEvents[this.name].all) {

                loadedFile.events[this.name]({

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
                });
            };
        });
    }
};
