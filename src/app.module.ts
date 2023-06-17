import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationCommandOptionType } from 'discord.js';
import { DiscordBotModule } from './discord_bot/discord_bot.module';

import { pingAndPong, getPage } from './functions';

const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
    action: pingAndPong,
  },
  {
    name: 'get',
    description: 'Getting image',
    action: getPage,
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
@Module({
  imports: [
    DiscordBotModule.register(commands),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
  ],
})
export class AppModule {}
