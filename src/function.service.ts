import { Inject } from '@nestjs/common';
import { ChatInputCommandInteraction, CacheType } from 'discord.js';
import { PngPageOutput, pdfToPng } from 'pdf-to-png-converter';
import { OpenAiService } from './ai/openai.service';

export class FunctionService {
  constructor(
    @Inject('OPEN_AI_SERVICE') private openAiService: OpenAiService,
  ) {}

  async ask(interaction: ChatInputCommandInteraction<CacheType>) {
    const question =
      (interaction.options.get('prompt')?.value as string) || null;

    if (!question) return interaction.reply("Sry, I didn't get it");
    interaction.reply('processing');
    const answer = await this.openAiService.createChat([
      {
        content:
          'Message format for Discord channel message. So if customer ask code use this markup ```ts ',
        role: 'system',
      },
      {
        content: question,
        role: 'user',
      },
    ]);
    console.log(answer.choices[0]);
    interaction.channel.send({
      content: answer.choices[0].message.content,
    });
  }

  async get(interaction: ChatInputCommandInteraction<CacheType>) {
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

  async ping(interaction: ChatInputCommandInteraction<CacheType>) {
    await interaction.reply('Pong!');
  }
}
