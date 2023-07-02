![banner](https://raw.githubusercontent.com/kh0wel/ydf/main/assets/banner.png)

<div align="center">
	<br />
	<p>
		<a href="https://www.npmjs.com/package/ydf"><img src="https://img.shields.io/npm/v/ydf.svg" /></a>
		<a href="https://www.npmjs.com/package/ydf"><img src="https://img.shields.io/npm/dt/ydf.svg" /></a>
	</p>
</div>

## About

A development tool to build [Discord](https://discord.com) bots

## Features

- 📚 Writed on [TypeScript](https://www.typescriptlang.org).

- 🧳 Supported for various runtime environments (tested on [Bun](https://bun.sh) and [Node](https://nodejs.org)).

- 🔌 Designed for most libraries (tested on [biscuit](https://biscuitjs.com) and [discord.js](https://discord.js.org)).

- 🧱 Implemented [Plug-in](https://en.wikipedia.org/wiki/Plug-in_%28computing%29) system.

- 🍂 Reduced size and dependencies.

## Starting

1. Install this tool.

2. Install you favorite Discord library.

3. Start a new project using this:

    ```bash
    ydf init
    ```

## Configuration

```js
import { Client } from 'discord.js';

export default {

	bot ({ usedIntents, usedPartials }) {

		return new Client({ intents: usedIntents, partials: usedPartials });
	},

	cwd: '.',

	plugins: [],

	include: [

		'**/*.event.*',
		'**/*.service.*',
		'**/*.command.chat.*'
		'**/*.command.user.*',
		'**/*.command.message.*'
	],

	exclude: [ '**/.*' ]
};
```

## Plug-in





## Examples

See an example [here](https://github.com/kh0wel/kobalt).
