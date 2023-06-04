import path from 'node:path';

export default async function (directory) {

    const { default: data } = await import(`file:///${ path.join(directory, '.ydfrc.js') }`);

    return {

        ... data,

        directories: {

            events: data.directories?.events

                ? path.resolve(data.directories.events)

                : path.join(process.cwd(), 'src', 'events'),

            services: data.directories?.services

                ? path.resolve(data.directories.services)

                : path.join(process.cwd(), 'src', 'services'),

            commands: {

                chat: data.directories?.commands?.chat

                    ? path.resolve(data.directories.commands.chat)

                    : path.join(process.cwd(), 'src', 'commands'),

                user: data.directories?.commands?.user

                    ? path.resolve(data.directories.commands.user)

                    : path.join(process.cwd(), 'src', 'commands'),

                message: data.directories?.commands?.message

                    ? path.resolve(data.directories.commands.message)

                    : path.join(process.cwd(), 'src', 'commands')
            }
        },

        extensions: {

            events:   data.extensions?.events   ?? '.event.js',
            services: data.extensions?.services ?? '.service.js',

            commands: {

                chat:    data.extensions?.commands?.chat    ?? '.command.chat.js',
                user:    data.extensions?.commands?.user    ?? '.command.user.js',
                message: data.extensions?.commands?.message ?? '.command.message.js'
            }
        }
    };
}
