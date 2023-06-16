import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscordBotModule } from './discord_bot/discord_bot.module';

@Module({
  imports: [
    DiscordBotModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
  ],
})
export class AppModule {}
