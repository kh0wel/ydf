## Features

- ⚡ **Performance**:

    A structure was implemented that allows algorithms to be used to evaluate and determine if one or more resources are needed.

- 🧱 **Flexibility**:

    Implemented the possibility of using different versions of [biscuit.js](https://www.biscuitjs.com).

- 💪🏻 **Productivity**:

    Useful resources are included when creating a new project.

- 🚀 **Compatibility**:

    You can use [Bun](https://bun.sh) or [Node](https://nodejs.org).

## Template

Download template [here](https://github.com/kh0wel/yotrd/template).

## Workspace

```
|_ .yotrd.config.js
|
|_ events/
|
|_ services/
|
|_ commands/

    |_ chat/
    |
    |_ user/
    |
    |_ message/
```

## Build

### Building a event

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

### Building a service

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

### Building a slash command

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

            // 'en-US': 'example',
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

### Building a user context menu command

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

            // 'en-US': 'Example',
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

### Building a message context menu command

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

            // 'en-US': 'Example',
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
