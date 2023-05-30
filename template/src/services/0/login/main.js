export default {

    events: {

        summon ({ session }) {

            session
                .start()
                .then(() => console.log('Bot connected'));
        }
    }
};
