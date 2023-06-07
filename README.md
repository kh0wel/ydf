![banner](https://raw.githubusercontent.com/kh0wel/ydf/main/assets/banner.png)

<div align="center">
	<br />
	<p>
		<a href="https://www.npmjs.com/package/ydf"><img src="https://img.shields.io/npm/v/ydf.svg?maxAge=3600" alt="npm version" /></a>
		<a href="https://www.npmjs.com/package/ydf"><img src="https://img.shields.io/npm/dt/ydf.svg?maxAge=3600" alt="npm downloads" /></a>
	</p>
</div>

## About

A framework for building fast and efficient Discord bots with [biscuit.js](https://biscuitjs.com).

## Features

- 🧼 **Simplified**.

    Fulfills essential requirements.

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

## Template

Download [here](https://github.com/kh0wel/kobalt).

## Commands

```ydf init```
```ydf deploy```

## Configuration

```js
export default {

    // Session class options (is required)
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

    // Extensions of files (is optional)
    files: {

        events:   '.event.',
        services: '.service.',

        commands: {

            chat:    '.command.chat.',
            user:    '.command.user.',
            message: '.command.message.'
        }
    },

    // Directories of files (is optional)
    directories: {

        events:   'src/events',
        services: 'src/services',

        commands: {

            chat:    'src/commands',
            user:    'src/commands',
            message: 'src/commands'
        }
    }
};
```
