# Yet another Discord Framework

A framework for building fast and efficient Discord bots with [biscuit.js](https://biscuitjs.com).

## Features

- ⚡ **Performance**.

    Algorithms to evaluate and determine whether one or more resources are needed.

- 🧱 **Scalability**.

    Possibility of using different versions of [biscuit.js](https://biscuitjs.com).

- 🚀 **Compatibility**.

    Possibility of using of [Bun](https://bun.sh) or [Node](https://nodejs.org).

- 💪🏻 **Productivity**.

    Recursive load.

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

### `ydf init [<new-folder-name>]`

### `ydf deploy [<config-file-path>]`

## Configuration

```js
export default {

    session ({

        config,

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands,

        usedEvents,
        usedIntents
    }) {

        // https://docs.biscuitjs.com/classes/core_src.Biscuit.html
        return { intents: usedIntents, token: 'XXXX-XXXX-XXXX-XXXX' };
    },

    directories: {

        // Events directory (Optional)
        events: 'events',

        // Services directory (Optional)
        services: 'services',

        commands: {

            // Slash Commands directory (Optional)
            chat: 'commands',

            // User Context Menu Commands directory (Optional)
            user: 'commands',

            // Message Context Menu Commands directory (Optional)
            message: 'commands'
        }
    },

    extensions: {

        // Events file (Optional)
        events: '.event.js ',

        // Services file (Optional)
        services: '.service.js',

        commands: {

            // Slash Commands file (Optional)
            chat: '.command.chat.js',

            // User Context Menu Commands file (Optional)
            chat: '.command.user.js',

            // Message Context Menu Commands file (Optional)
            chat: '.command.message.js',
        }
    },
};
```

## Structures

### Event

```js
export default {

    // Folder name (Automatic)
    name: 'example',

    // Event intents (Optional)
    intents: 0,

    // Event function
    execute ({

        config, session,

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands,

        usedEvents,
        usedIntents
    }) {

        // ...
    }
};
```

### Service

```js
export default {

    // Folder name (Automatic)
    name: 'example',

    // Service intents (Optional)
    intents: 0,

    // Service events
    events: {

        example ({

            config, session,

            loadedEvents,
            loadedServices,
            loadedChatInputCommands,
            loadedUserContextMenuCommands,
            loadedMessageContextMenuCommands,

            usedEvents,
            usedIntents
        }) {

            // ...
        }
    }
};
```

### Slash Command

```js
export default {

    // Folder name (Automatic)
    name: 'example',

    // Command type (Automatic)
    type: 1,

    // Command intents (Optional)
    intents: 0,

    // Command display options
    display: {

        // Command name
        name: {

            default: 'example',

            // 'es-ES': 'ejemplo',
            // ...
        },

        // Command description
        description: {

            default: 'Example command',

            // 'es-ES': 'Comando de ejemplo',
            // ...
        },

        // Command options (Optional)
        options: [],

        // Command permissions (Optional)
        permissions: {

            // Allow dm channels (Optional)
            dm: false,

            // Require adult member age (Optional)
            nsfw: false,

            // Required member permissions (Optional)
            member: null
        }
    }
};
```

### User Context Menu Command

```js
export default {

    // Folder name (Automatic)
    name: 'example',

    // Command type (Automatic)
    type: 2,

    // Command intents (Optional)
    intents: 0,

    // Command display options
    display: {

        // Command name
        name: {

            default: 'Example',

            // 'es-ES': 'Ejemplo',
            // ...
        },

        // Command permissions (Optional)
        permissions: {

            // Allow dm channels (Optional)
            dm: false,

            // Require adult member age (Optional)
            nsfw: false,

            // Required member permissions (Optional)
            member: null
        }
    }
};
```

### Message Context Menu Command

```js
export default {

    // Folder name (Automatic)
    name: 'example',

    // Command type (Automatic)
    type: 3,

    // Command intents (Optional)
    intents: 0,

    // Command display options
    display: {

        // Command name
        name: {

            default: 'Example',

            // 'es-ES': 'Ejemplo',
            // ...
        },

        // Command permissions (Optional)
        permissions: {

            // Allow dm channels (Optional)
            dm: false,

            // Require adult member age (Optional)
            nsfw: false,

            // Required member permissions (Optional)
            member: null
        }
    }
};
```
