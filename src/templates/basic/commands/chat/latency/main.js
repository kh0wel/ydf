export default {

    display: {

        name:        { default: 'latency'                     },
        description: { default: 'Muestra la latencia del bot' },

        permissions: { dm: false }
    },

    events: {

        command ({ client, event }) {

            event.reply({ content: `\`\` ${client.ws.ping} \`\` ms`, ephemeral: true });
        }
    }
};
