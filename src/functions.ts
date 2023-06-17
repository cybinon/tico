import { CacheType, ChatInputCommandInteraction } from 'discord.js';
import { PngPageOutput, pdfToPng } from 'pdf-to-png-converter';

// Getting pdf page function
export const getPage = async (
  interaction: ChatInputCommandInteraction<CacheType>,
) => {
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
};

// Pong answer
export const pingAndPong = async (
  interaction: ChatInputCommandInteraction<CacheType>,
) => {
  await interaction.reply('Pong!');
};
