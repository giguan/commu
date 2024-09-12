import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { AllExceptionsFilter } from './filters/http-exception.filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new AllExceptionsFilter());

  // 요청 본문 크기 제한을 늘립니다.
  app.use(bodyParser.json({ limit: '50mb' })); // JSON 요청 크기 제한
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // URL-encoded 요청 크기 제한

  // 정적 파일 서빙 경로 설정 (uploads 폴더를 정적으로 제공)
  // app.useStaticAssets(join(__dirname, '..', 'uploads'), {
  //   prefix: '/uploads', // 요청 경로
  // });

  // cors
  if (process.env.NODE_ENV !== 'production') {
    app.enableCors({
      origin: ['http://localhost:3000'],
      credentials: true,
    });
  } else {
    app.enableCors({
      origin: true,
      credentials: true,
    });
  }

  const PORT = 3095;

  await app.listen(PORT);

  console.log(`listen on Server.............................. ${PORT}`);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
