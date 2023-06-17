import { DynamicModule, Module } from '@nestjs/common';
import { BotService, CommandType } from './bot.service';

@Module({})
export class DiscordBotModule {
  static botService: BotService;

  static register(commands: CommandType[]): DynamicModule {
    return {
      module: DiscordBotModule,
      providers: [
        BotService,
        {
          provide: 'DISCORD_COMMANDS',
          useValue: commands,
        },
      ],
      exports: [BotService],
    };
  }
}
