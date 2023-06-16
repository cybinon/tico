import {
  ApplicationCommandOptionType,
  Client,
  GatewayIntentBits,
  REST,
  Routes,
} from 'discord.js';
import { PngPageOutput, pdfToPng } from 'pdf-to-png-converter';

export class BotService {
  async onApplicationBootstrap() {
    this.initCommands();
    this.discortBotInit();
  }
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
    const commands = [
      {
        name: 'ping',
        description: 'Replies with Pong!',
      },
      {
        name: 'get',
        description: 'Getting image',
        options: [
          {
            name: 'page',
            description: 'Enter your page number',
            type: ApplicationCommandOptionType.Number,
            required: true,
          },
        ],
      },
    ];
    try {
      await this.rest.put(
        Routes.applicationCommands(process.env.DISCORD_APP_ID),
        {
          body: commands,
        },
      );
      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  }

  async discortBotInit() {
    const client = new Client({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });

    client.on('ready', async () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('interactionCreate', async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
      }
      if (interaction.commandName === 'get') {
        const selectedPage = parseInt(
          (interaction.options.get('page')?.value as string) || '1',
        );
        const pngPages: PngPageOutput[] = await pdfToPng(
          './test.pdf', // The function accepts PDF file path or a Buffer
          {
            disableFontFace: true,
            useSystemFonts: false,
            enableXfa: false,
            viewportScale: 2.0,
            outputFileMask: 'buffer',
            pagesToProcess: [selectedPage],
            strictPagesToProcess: false,
            verbosityLevel: 0,
          },
        );
        interaction.reply('Here it is');
        interaction.channel.send({
          files: [{ attachment: pngPages[0].content, name: 'manga_page.png' }],
        });
      }
    });

    client.login(process.env.DISCORD_BOT_TOKEN);
  }
}
