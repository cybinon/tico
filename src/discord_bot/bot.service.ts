import { Inject } from '@nestjs/common';
import {
  ApplicationCommandOptionType,
  CacheType,
  Client,
  CommandInteraction,
  GatewayIntentBits,
  REST,
  Routes,
} from 'discord.js';

export type CommandType = {
  name: string;
  description: string;
  action: (interaction: CommandInteraction<CacheType>) => any;
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
    const hashCommands = this.commands.reduce((acc, itt) => {
      acc[itt.name] = itt;
      return acc;
    }, {});

    client.on('ready', async () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      const command = hashCommands[interaction.commandName];
      if (command && typeof command.action === 'function')
        command.action(interaction);
    });

    client.login(process.env.DISCORD_BOT_TOKEN);
  }
}
