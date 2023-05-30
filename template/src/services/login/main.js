export default {

    level: 1,

    events: {

        summon ({ session }) {

            session
                .start()
                .then(() => console.log('Bot connected'));
        }
    }
};
