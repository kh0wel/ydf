# Yet another Discord Framework

A framework for building fast and efficient Discord bots with [biscuit.js](https://biscuitjs.com).

## Features

- 📐 **Opinionated**.

    Flexible and strict infrastructure.

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

    session ({ config, loadedFiles, usedEvents, usedIntents }) {

        return { intents: usedIntents, token: 'TOKEN' };
    },

    exclude: [ 'src/**/*.json' ],

    include: [

        'src/**/*.event.*',
        'src/**/*.service.*',
        'src/**/*.command.chat.*',
        'src/**/*.command.user.*',
        'src/**/*.command.message.*'
    ]
};
```

## Structures

### Event

```js
export default {

    name: 'example', // (Automatic)

    path: '/abc/example.event.js', // (Automatic)

    intents: 0, // (Optional)

    execute ({ config, loadedFiles, usedEvents, usedIntents }) { /* ... */ }
};
```

### Service

```js
export default {

    name: 'example', // (Automatic)

    path: '/abc/example.service.js', // (Automatic)

    intents: 0, // (Optional)

    events: {

        example ({ config, loadedFiles, usedEvents, usedIntents }) { /* ... */ },

        // ejemplo ({ config, loadedFiles, usedEvents, usedIntents }) { /* ... */ },
        // ...
    }
};
```

### Slash Command

```js
export default {

    name: 'example', // (Automatic)

    path: '/abc/example.command.chat.js', // (Automatic)

    type: 1, // (Automatic)

    intents: 0, // (Optional)

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

        options: [], // (Optional)

        permissions: {

            dm: false, // (Optional)

            nsfw: false, // (Optional)

            member: null // (Optional)
        }
    },

    events: {

        example ({ config, loadedFiles, usedEvents, usedIntents }) { /* ... */ },

        // ejemplo ({ config, loadedFiles, usedEvents, usedIntents }) { /* ... */ },
        // ...
    }
};
```

### User Context Menu Command

```js
export default {

    name: 'example', // (Automatic)

    path: '/abc/example.command.user.js', // (Automatic)

    type: 2, // (Automatic)

    intents: 0, // (Optional)

    display: {

        name: {

            default: 'example',

            // 'es-ES': 'ejemplo',
            // ...
        },

        permissions: {

            dm: false, // (Optional)

            nsfw: false, // (Optional)

            member: null // (Optional)
        }
    },

    events: {

        example ({ config, loadedFiles, usedEvents, usedIntents }) { /* ... */ },

        // ejemplo ({ config, loadedFiles, usedEvents, usedIntents }) { /* ... */ },
        // ...
    }
};
```

### Message Context Menu Command

```js
export default {

    name: 'example', // (Automatic)

    path: '/abc/example.command.message.js', // (Automatic)

    type: 3, // (Automatic)

    intents: 0, // (Optional)

    display: {

        name: {

            default: 'example',

            // 'es-ES': 'ejemplo',
            // ...
        },

        permissions: {

            dm: false, // (Optional)

            nsfw: false, // (Optional)

            member: null // (Optional)
        }
    },

    events: {

        example ({ config, loadedFiles, usedEvents, usedIntents }) { /* ... */ },

        // ejemplo ({ config, loadedFiles, usedEvents, usedIntents }) { /* ... */ },
        // ...
    }
};
```
