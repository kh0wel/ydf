import path from 'node:path';

export default async function (directory) {

    const { default: data } = await import(`file:///${ path.join(directory, '.ydf.config.js') }`);

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

                    : path.join(process.cwd(), 'src', 'commands', 'chat'),

                user: data.directories?.commands?.user

                    ? path.resolve(data.directories.commands.user)

                    : path.join(process.cwd(), 'src', 'commands', 'user'),

                message: data.directories?.commands?.message

                    ? path.resolve(data.directories.commands.message)

                    : path.join(process.cwd(), 'src', 'commands', 'message')
            }
        }
    };
}
