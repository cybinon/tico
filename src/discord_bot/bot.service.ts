import { Inject } from '@nestjs/common';
import {
  ApplicationCommandOptionType,
  Client,
  GatewayIntentBits,
  REST,
  Routes,
} from 'discord.js';

export type CommandType = {
  name: string;
  description: string;
  options?: {
    name: string;
    description: string;
    type: ApplicationCommandOptionType;
    required: boolean;
  }[];
};

export class BotService {
  constructor(
    @Inject('DISCORD_COMMANDS') private readonly commands: CommandType[],
    @Inject('FUNCTION_SERVICE') private readonly functions: Record<string, any>,
  ) {}
  rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

  async sendMessage(channelId: string, message: string) {
    const res = await this.rest.post(Routes.channelMessages(channelId), {
      body: {
        content: message,
      },
    });
    return res;
  }

  async initCommands() {
    try {
      await this.rest.put(
        Routes.applicationCommands(process.env.DISCORD_APP_ID),
        {
          body: this.commands.map((command) => {
            return { ...command, action: undefined };
          }),
        },
      );
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  }

  async start() {
    const client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });

    client.on('ready', async () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      if (
        this.functions &&
        typeof this.functions[interaction.commandName] === 'function'
      )
        this.functions[interaction.commandName](interaction);
      else interaction.reply('Sry, Command not available right now');
    });

    client.login(process.env.DISCORD_BOT_TOKEN);
  }
}
