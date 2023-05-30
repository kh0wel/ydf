export default {

    display: {

        name:        { default: 'ping'      },
        description: { default: 'Ping Pong' }
    },

    events: {

        interactionCommand ({ event: { interaction } }) {

            interaction.respondWith('Pong');
        }
    }
};
