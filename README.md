# Yet another Discord Framework

<div align="center">
	<br />
	<p style="background-color: #ffffff">
		<img src="C:\Users\Gabriel\Documents\ydf\assets\icon.png" width="546" alt="Yet another Discord Framework" /></a>
	</p>
	<br />
	<p>
		<a href="https://www.npmjs.com/package/ydf"><img src="https://img.shields.io/npm/v/ydf.svg?maxAge=3600" alt="npm version" /></a>
		<a href="https://www.npmjs.com/package/ydf"><img src="https://img.shields.io/npm/dt/ydf.svg?maxAge=3600" alt="npm downloads" /></a>
	</p>
</div>

A framework for building fast and efficient Discord bots with [biscuit.js](https://biscuitjs.com).

## Features

- 💪🏻 **Productivity**.

    Recursive resource load.

- ⚡ **Performance**.

    Smart resource management.

- 🚀 **Compatibility**.

    Different versions of [biscuit.js](https://biscuitjs.com).

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

    intents: 0,

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

    intents: 0,

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

    intents: 0,

    display: {

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

        options: [],

        permissions: {

            dm:   false,
            nsfw: false,

            member: null
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

    intents: 0,

    display: {

        name: {

            default: 'example',

            // 'es-ES': 'ejemplo',
            // ...
        },

        permissions: {

            dm:   false,
            nsfw: false,

            member: null
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

    intents: 0,

    display: {

        name: {

            default: 'example',

            // 'es-ES': 'ejemplo',
            // ...
        },

        permissions: {

            dm:   false,
            nsfw: false,

            member: null
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
