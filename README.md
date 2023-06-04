# Yet another Discord Framework

A framework for building fast and efficient Discord bots with [biscuit.js](https://biscuitjs.com).

## Features

- 💪🏻 **Productivity**.

    Recursive resource load.

- ⚡ **Performance**.

    Smart resource management.

- 🚀 **Compatibility**.

    Different versions of dasdasda [biscuit.js](https://biscuitjs.com).

- 🧱 **Multiplatform**.

    Different environments of [Bun](https://bun.sh) or [Node](https://nodejs.org).

## Installation

1. Install [biscuit.js](https://npmjs.com/package/@biscuitland/core).

    ```bash
    npm add @biscuitland/core -g
    ```

2. Install [ydf](https://npmjs.com/package/ydf).

    ```bash
    npm add ydf -g
    ```

## Commands

```bash
ydf init [<new-folder-name>]
```

```bash
ydf deploy [<config-file-path>]
```
 
## Configuration

```js
export default {

    session ({

        laodedEvents,
        laodedServices,
        laodedChatInputCommands,
        loadedMessageContextMenuCommands,
        loadedUserContextMenuCommands,

        usedEvents,
        usedIntents
    }) {

        return { intents: usedIntents, token: 'XXXXX-XXXXX-XXXXX-XXXXX' };
    },

    exclude: [ '**/*.json' ],

    include: [

        'src/**/*.event.*',
        'src/**/*.service.*',
        'src/**/*.command.chat.*',
        'src/**/*.command.user.*',
        'src/**/*.command.message.*'
    ]
};
```

## Building

### Event

```js
export default {

    name: 'example',              // (Automatic)
    path: 'C://example.event.js', // (Automatic)

    intents: 0, // (Optional)

    execute ({

        config, session,

        laodedEvents,
        laodedServices,
        laodedChatInputCommands,
        loadedMessageContextMenuCommands,
        loadedUserContextMenuCommands,

        usedEvents,
        usedIntents
    }) {

        console.log('Hello world');
    }
};
```

### Service

```js
export default {

    name: 'example',                // (Automatic)
    path: 'C://example.service.js', // (Automatic)

    intents: 0, // (Optional)

    events: {

        example ({

            config, session,

            laodedEvents,
            laodedServices,
            laodedChatInputCommands,
            loadedMessageContextMenuCommands,
            loadedUserContextMenuCommands,

            usedEvents,
            usedIntents
        }) {

            console.log('Hello world');
        }
    }
};
```

### Slash Command

```js
export default {

    name: 'example',                     // (Automatic)
    path: 'C://example.command.chat.js', // (Automatic)

    intents: 0, // (Optional)

    display: {

        type: 1, // (Automatic)

        name: {

            default: 'example',

            // 'es-ES': 'ejemplo',
            // ...
        },

        description: {

            default: 'Example command',

            // 'es-ES': 'Comando de ejemplo',
            // ...
        },

        options: [], // (Optional)

        permissions: {

            dm:   false, // (Optional)
            nsfw: false, // (Optional)

            member: null // (Optional)
        }
    },

    events: {

        example ({

            config, session,

            laodedEvents,
            laodedServices,
            laodedChatInputCommands,
            loadedMessageContextMenuCommands,
            loadedUserContextMenuCommands,

            usedEvents,
            usedIntents
        }) {

            console.log('Hello world');
        }
    }
};
```

### User Context Menu Command

```js
export default {

    name: 'example',                     // (Automatic)
    path: 'C://example.command.user.js', // (Automatic)

    intents: 0, // (Optional)

    display: {

        type: 2, // (Automatic)

        name: {

            default: 'example',

            // 'es-ES': 'ejemplo',
            // ...
        },

        permissions: {

            dm:   false, // (Optional)
            nsfw: false, // (Optional)

            member: null // (Optional)
        }
    },

    events: {

        example ({

            config, session,

            laodedEvents,
            laodedServices,
            laodedChatInputCommands,
            loadedMessageContextMenuCommands,
            loadedUserContextMenuCommands,

            usedEvents,
            usedIntents
        }) {

            console.log('Hello world');
        }
    }
};
```

### Message Context Menu Command

```js
export default {

    name: 'example',                        // (Automatic)
    path: 'C://example.command.message.js', // (Automatic)

    intents: 0, // (Optional)

    display: {

        type: 3, // (Automatic)

        name: {

            default: 'example',

            // 'es-ES': 'ejemplo',
            // ...
        },

        permissions: {

            dm:   false, // (Optional)
            nsfw: false, // (Optional)

            member: null // (Optional)
        }
    },

    events: {

        example ({

            config, session,

            laodedEvents,
            laodedServices,
            laodedChatInputCommands,
            loadedMessageContextMenuCommands,
            loadedUserContextMenuCommands,

            usedEvents,
            usedIntents
        }) {

            console.log('Hello world');
        }
    }
};
```
