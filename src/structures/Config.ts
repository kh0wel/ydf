export class ConfigBuilder {

    session ({ usedIntents }) { return { intents: usedIntents, token: process.env.BOT_TOKEN }; }

    exclude = []

    include = [ 'src/**/*.js' ]

    constructor (data) {

    }
}
