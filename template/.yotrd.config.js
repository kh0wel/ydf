import 'dotenv/config';

export default {

    session () { 

        return { token: process.env.BOT_TOKEN };
    }
};
