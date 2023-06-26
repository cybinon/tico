import { Global, Module } from '@nestjs/common';
import { OpenAiService } from './openai.service';

@Global()
@Module({
  imports: [],
  providers: [
    {
      useClass: OpenAiService,
      provide: 'OPEN_AI_SERVICE',
    },
  ],
  exports: [
    {
      useClass: OpenAiService,
      provide: 'OPEN_AI_SERVICE',
    },
  ],
})
export class AIModule {}
