import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApplicationCommandOptionType } from 'discord.js';
import { AIModule } from './ai/ai.module';
import { DiscordBotModule } from './discord_bot/discord_bot.module';
import { FunctionService } from './function.service';

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
  {
    name: 'ask',
    description: 'ASK ME ANYTHING',
    options: [
      {
        name: 'prompt',
        description: 'ASK ME ANYTHING',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
    ],
  },
];
@Module({
  imports: [
    AIModule,
    FunctionService,
    DiscordBotModule.register(commands, FunctionService),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
  ],
})
export class AppModule {}
