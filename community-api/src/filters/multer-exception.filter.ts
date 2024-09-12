import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { MulterError } from 'multer';
import { Response } from 'express';

@Catch(MulterError) // Multer 에러를 처리하는 필터
export class MulterExceptionFilter implements ExceptionFilter {
  catch(exception: MulterError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST; // 파일 업로드 에러는 BAD_REQUEST로 처리

    // 에러 메시지를 사용자에게 반환
    response.status(status).json({
      statusCode: status,
      message: `Multer Error: ${exception.message}`,
    });
  }
}
