import { Module } from '@nestjs/common';
import { BotService } from './bot.service';

@Module({
  imports: [],
  providers: [BotService],
})
export class DiscordBotModule {}
