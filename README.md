# Tico - Discord Bot 🤖

## Description

Tico is a Discord bot built using NestJS. It provides various features and functionalities to enhance your Discord server experience.

## Table of Contents

- [Tico - Discord Bot 🤖](#tico---discord-bot-)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation 🚀](#installation-)
  - [Usage 🎮](#usage-)
  - [Features ✨](#features-)
  - [Configuration ⚙️](#configuration-️)
  - [Adding Commands 🛠️](#adding-commands-️)
  - [Contributing 🤝](#contributing-)
  - [License 📝](#license-)

## Installation 🚀

Before proceeding with the installation, make sure you have the following prerequisites:

- Node.js (version 18.15.0 or above) 🌟
- pnpm (version 7.18.1 or above) 🌟
- Discord bot token (obtain it from the Discord Developer Portal) 🔑
- Discord application ID (obtain it from the Discord Developer Portal) 🔑
- NestJS (version 9 or above) 🚀

To install and set up the project, follow these steps:

1. Clone the repository: `git clone https://github.com/cybinon/tico.git`
2. Navigate to the project directory: `cd tico`
3. Install the dependencies: `pnpm install`
4. Create a `.env.local` file in the project root and add the following environment variables:

```ts

DISCORD_BOT_TOKEN=your-discord-bot-token
DISCORD_APP_ID=your-discord-app-id

```


## Usage 🎮

To start the Discord bot, use the following command: `pnpm start`

You can also run the bot in development mode using the command: `pnpm run start:dev`

The bot should now be up and running, and you can invite it to your Discord server using the OAuth2 URL generated from the Discord Developer Portal.

To adding bot your discord server configure this link and open: 

```ts

`https://discord.com/api/oauth2/authorize?client_id=`client id here`&permissions=8&scope=bot`

```
![image](https://user-images.githubusercontent.com/56419470/246589488-20da5f46-c74b-481c-8458-7201dac1eb54.png)

## Features ✨

Tico Discord Bot comes with the following features:

1. **Sending Messages**: The bot provides a convenient method to send messages to specific channels.

2. **Initializing Commands**: You can easily initialize and manage custom slash commands using the `initCommands` method provided by the `BotService`.

3. **Handling Interactions**: The bot handles chat input commands using the `interactionCreate` event. It automatically routes the interactions to the corresponding action defined in the `commands` array.

Feel free to modify and extend the provided code to implement additional features as per your requirements.


Feel free to customize the bot's features by modifying the code to suit your needs.

## Configuration ⚙️

[**First of all you need create your discord app and get your token. Click Me!**](https://discord.com/developers/applications)

The bot can be configured by modifying the environment variables in the `.env.local` file. The available configuration options are as follows:

- `DISCORD_BOT_TOKEN`: Your Discord bot token obtained from the Discord Developer Portal.
- `DISCORD_APP_ID`: Your Discord application ID obtained from the Discord Developer Portal.


## Adding Commands 🛠️

To add custom commands to the bot, follow these steps:

1. Open the `app.module.ts` file located in the `src` directory.
2. Locate the `commands` array.
3. Add your command objects to the array, following this structure:

   ```typescript
   {
     name: 'command-name',
     description: 'Description of the command',
     action: yourFunctionName,
   },
Make sure to replace `'command-name'` with the desired command name, `'Description of the command'` with a brief description of the command, and `yourFunctionName` with the actual name of your function defined in `src/functions.ts`.

4. Save the file and restart the bot if it's already running.

## Contributing 🤝

Contributions are welcome! If you find any bugs or have suggestions for improvement, please open an issue or submit a pull request. Make sure to follow the project's code style and guidelines.

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request.

## License 📝

This project is licensed under the MIT License. You are free to use, modify, and distribute the code in any way you see fit.
