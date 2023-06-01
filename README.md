# Yet another Discord Framework

A framework for building fast and efficient Discord bots with [biscuit.js](https://biscuitjs.com).

## Features

- ⚡ **Performance**:

    Algorithms to evaluate and determine whether one or more resources are needed.

- 🧱 **Scalability**:

    Possibility of using different versions of [biscuit.js](https://biscuitjs.com).

- 🚀 **Compatibility**:

    Possibility of using of [Bun](https://bun.sh) or [Node](https://nodejs.org).

- 💪🏻 **Productivity**:

    Recursive resource load.

## Installation

1. Install [biscuit.js](https://npmjs.com/package/@biscuitland/core):

    ```bash
    npm add @biscuitland/core -g
    ```

2. Install [ydf](https://npmjs.com/package/ydf):

    ```bash
    npm add ydf -g
    ```

## Commands

- `ydf init [<new-folder-name>]`.

- `ydf deploy [<config-file-path>]`.

## Configuration

```js
export default {

    // Session options
    session ({

        eventsPath,
        servicesPath,
        chatInputCommandsPath,
        userContextMenuCommandsPath,
        messageContextMenuCommandsPath,

        loadedEvents,
        loadedServices,
        loadedChatInputCommands,
        loadedUserContextMenuCommands,
        loadedMessageContextMenuCommands,

        usedEvents,
        usedIntents
    }) {

        // https://docs.biscuitjs.com/classes/core_src.Biscuit.html
        return { token: 'XXXX-XXXX-XXXX-XXXX' };
    },

    // Directory options (Optional)
    directories: {

        // Events directory (Optional)
        events: './events',

        // Services directory (Optional)
        services: './services',

        // Commands directory (Optional)
        commands: {

            // Slash Commands directory (Optional)
            chat: './commands/chat',

            // User Context Menu Commands directory (Optional)
            user: './commands/user',

            // Message Context Menu Commands directory (Optional)
            message: './commands/message'
        }
    }
};
```

## Examples

See examples [here](https://github.com/kh0wel/kobalt).

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

        eventsPath,
        servicesPath,
        chatInputCommandsPath,
        userContextMenuCommandsPath,
        messageContextMenuCommandsPath,

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

            eventsPath,
            servicesPath,
            chatInputCommandsPath,
            userContextMenuCommandsPath,
            messageContextMenuCommandsPath,

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

            // 'en-US': 'Example command',
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
        },

        // Command display data with API format (Automatic)
        data: {

            name:        'example', 
            description: 'Example',

            name_localizations:        {},
            description_localizations: {},

            options: [],

            dm_permission: false,
            nsfw:          false,

            default_member_permissions: null
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
        },

        // Command display data with API format (Automatic)
        data: {

            name: 'Example', 

            name_localizations: {},

            dm_permission: false,
            nsfw:          false,

            default_member_permissions: null
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
        },

        // Command display data with API format (Automatic)
        data: {

            name: 'Example', 

            name_localizations: {},

            dm_permission: false,
            nsfw:          false,

            default_member_permissions: null
        }
    }
};
```
