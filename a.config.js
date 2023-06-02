export default {

    session ({

        config,

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands,

        usedEvents,
        usedIntents
    }) {

        return {

            intents: usedIntents,

            token: 'XXXX-XXXX-XXXX-XXXX'
        };
    },

    directories: {

        events:   '.',
        services: '.',

        commands: {

            chat:    '.',
            user:    '.',
            message: '.'
        }
    }
};
