export default {

    display: {

        name:        { default: 'latency'          },
        description: { default: 'Show bot latency' },

        permissions: { dm: false }
    },

    events: {

        command ({ client, event }) {

            event.reply({ content: `\`\` ${ client.ws.ping } \`\` ms`, ephemeral: true });
        }
    }
};
