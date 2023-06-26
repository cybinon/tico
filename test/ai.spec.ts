import { Test } from '@nestjs/testing';
import { OpenAiService } from '../src/ai/openai.service';
import { AppModule } from '../src/app.module';

describe('Ai Service tester', () => {
  let service: OpenAiService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get(OpenAiService);
  });

  describe('create complation', () => {
    it('should be defined', async () => {
      const response = await service.createChat([
        {
          content: 'Hello',
          role: 'user',
        },
      ]);

      console.log(response);
      expect(response).toBeDefined();
    });
  });
});
