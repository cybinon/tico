import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BotService } from './discord_bot/bot.service';

async function bootstrap() {
  const port = Number(process.env.APP_PORT || 4040);
  const app = await NestFactory.create(AppModule);
  const discord = app.get(BotService);
  discord.initCommands();
  discord.start();
  app.listen(port);
}
bootstrap();
