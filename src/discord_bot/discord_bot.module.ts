import { DynamicModule, Module } from '@nestjs/common';
import { BotService, CommandType } from './bot.service';

@Module({})
export class DiscordBotModule {
  static botService: BotService;

  static register(commands: CommandType[], service: any): DynamicModule {
    return {
      module: DiscordBotModule,
      providers: [
        BotService,
        {
          provide: 'DISCORD_COMMANDS',
          useValue: commands,
        },
        {
          provide: 'FUNCTION_SERVICE',
          useClass: service,
        },
      ],
      exports: [BotService],
    };
  }
}
