export default {

    display: {

        name: { default: 'Ping' }
    },

    events: {

        interactionCommand ({ event: { interaction } }) {

            interaction.respondWith('Pong');
        }
    }
};
