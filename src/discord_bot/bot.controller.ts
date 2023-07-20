import { Controller, Get, Param } from '@nestjs/common';
import { Routes } from 'discord.js';
import { BotService } from './bot.service';

@Controller('bot/beta')
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Get(':guildId/:memberId')
  async getUsersByRoleId(
    @Param('guildId') guildId: string,
    @Param('memberId') memberId,
  ) {
    const roles = (await this.botService.rest
      .get(Routes.guildRoles(guildId))
      .catch(console.log)) as any;

    const roleHash = roles.reduce((acc, itt) => {
      acc[itt.id] = itt;
      return acc;
    }, {});
    const members = (await this.botService.rest
      .get(Routes.guildMember(guildId, memberId))
      .catch(console.log)) as any;

    members.roles = members.roles.map((el) => roleHash[el]);

    return members || 'NOT_FOUND';
  }
}
