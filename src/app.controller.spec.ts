import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return HTML containing "BakeMaster App"', () => {
      const result = appController.getHello();
      expect(result).toContain('BakeMaster App');
    });

    it('should contain at least one image tag', () => {
      const result = appController.getHello();
      expect(result).toMatch(/<img\s+src=.*?>/);
    });
  });
});
