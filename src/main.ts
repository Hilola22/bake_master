import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/logging/winston.logging';
import { AllExceptionsFilter } from './common/errors/error.handling';

async function start() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });
  app.useGlobalFilters(new AllExceptionsFilter())

  app.use(cookieParser());
  app.setGlobalPrefix('api');
  const configSwagger = new DocumentBuilder()
    .setTitle('BakeMaster')
    .setDescription('Prismada BakeMaster loyihasi API hujjati')
    .setVersion('1.0')
    .addTag('BakeMaster')
    .build();

  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api/docs', app, document);
  const config = app.get(ConfigService);
  const PORT = config.get<number>('PORT');
  await app.listen(PORT ?? 3030, () => {
    console.log(`
╔════════════════════════════════════════════════════╗
║ 🚀 Server started successfully!                    ║
║                                                    ║
║ 🌐 URL: http://localhost:${PORT}/api                  ║
╚════════════════════════════════════════════════════╝
`);
  });
}
start();
