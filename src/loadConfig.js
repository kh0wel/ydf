export default async function (path) {

    const { default: data } = await import(`file:///${ path }`);

    return {

        session: data.session,

        include: data.include ?? [

            'src/**/*.event.*',
            'src/**/*.service.*',
            'src/**/*.command.chat.*',
            'src/**/*.command.user.*',
            'src/**/*.command.message.*',
        ],

        exclude: data.exclude ?? []
    }
}
