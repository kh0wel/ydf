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

        session.events.on('interactionCreate', (interaction) => {

            if (!interaction.isCommand()) return;

            for (const loadedCommand of usedEvents[this.name].commands) {

                if (interaction.commandType !== loadedCommand.type
                ||  interaction.commandName !== loadedCommand.display.name.default) continue;

                loadedCommand.events[this.name]({

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

                break;
            };
        });
    }
};
