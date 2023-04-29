export default async function ({

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

    for (const loadedEvent of loadedEvents) {

        // Ignora el evento si no fue utilizado
        if (!usedEvents.has(loadedEvent.name)) continue;

        await loadedEvent.execute({

            client,

            directories: {

                events:   eventsPath,
                services: servicesPath,

                commands: {

                    chat:    chatInputCommandsPath,
                    user:    userContextMenuCommandsPath,
                    message: messageContextMenuCommandsPath
                }
            },

            loaded: {

                events:   loadedEvents,
                services: loadedServices,

                commands: {

                    chat:    loadedChatInputCommands,
                    user:    loadedUserContextMenuCommands,
                    message: loadedMessageContextMenuCommands
                }
            },

            used: {

                events:   usedEvents,
                intents:  usedIntents,
                partials: usedPartials
            }
        });
    };

    return {

        client,

        directories: {

            events:   eventsPath,
            services: servicesPath,

            commands: {

                chat:    chatInputCommandsPath,
                user:    userContextMenuCommandsPath,
                message: messageContextMenuCommandsPath
            }
        },

        loaded: {

            events:   loadedEvents,
            services: loadedServices,

            commands: {

                chat:    loadedChatInputCommands,
                user:    loadedUserContextMenuCommands,
                message: loadedMessageContextMenuCommands
            }
        },

        used: {

            events:   usedEvents,
            intents:  usedIntents,
            partials: usedPartials
        }
    };
};
