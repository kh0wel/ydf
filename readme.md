# Yet another Discord framework

A framework for building fast and efficient Discord bots with [biscuit.js](https://biscuitjs.com).

## Features

- ⚡ **Performance**:

    A structure was implemented that allows algorithms to be used to evaluate and determine if one or more resources are needed.

- 💪🏻 **Productivity**:

    Recursive file and directory load.

- 🧱 **Scalability**:

    Implemented the possibility of using different versions of [biscuit.js](https://biscuitjs.com).

- 🚀 **Compatibility**:

    You can use [Bun](https://bun.sh) or [Node](https://nodejs.org).

## Installation

1. Install [biscuit.js](https://npmjs.com/package/@biscuitland/core):

    ```bash
    npm add @biscuitland/core -g
    ```

2. Install [yord](https://npmjs.com/package/yotrd):

    ```bash
    npm add yotrd -g
    ```

## Commands

- `yotrd init [<folder-name>]`.

    This command will create the necessary directories and files for the correct functioning of the framework.

    ```
    .
    |_ .yotrd.config.js
    |
    |_ events/
    |
    |_ services/
    |
    |_ commands/
        .
        |_ chat/
        |
        |_ user/
        |
        |_ message/
    ```

- `yotrd deploy [<config-file-path>]`.

    This command will run the framework.

## Example

See example [here](https://github.com/kh0wel/kobalt).

## Structures

### Event

```js
export default {

    // Folder name (Automatic)
    name: 'example',

    // Event level (Optional)
    level: 0,

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

    // Service level (Optional)
    level: 0,

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

    // Command level (Optional)
    level: 0,

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

    // Command level (Optional)
    level: 0,

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

    // Command level (Optional)
    level: 0,

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
