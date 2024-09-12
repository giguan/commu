import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseFilters,
  BadRequestException,
  Body,
  // Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CommonService } from './common.service';
import { existsSync, mkdirSync, renameSync, unlinkSync } from 'fs';
import { MulterExceptionFilter } from 'src/filters/multer-exception.filter';

@Controller('common')
export class CommonController {
  constructor(private commonService: CommonService) {}

  @Post('upload-image-reply')
  @UseFilters(MulterExceptionFilter)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = './temp';
          if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath, { recursive: true });
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      limits: { fileSize: 10 * 1024 * 1024 }, // 파일 크기 제한 10MB
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('파일이 업로드되지 않았습니다.');
    }

    // DB 저장 로직 호출
    const savedImage = await this.commonService.saveImage();

    // 이미지와 게시물 또는 댓글 간의 관계를 저장
    await this.commonService.saveImageDetails(
      savedImage,
      file.filename,
      `/temp/${file.filename}`,
      1, // 기본 순서
    );

    return {
      message: 'File uploaded successfully',
      imageId: savedImage.id,
      imageUrl: `/temp/${file.filename}`,
    };
  }

  // 임시 저장된 이미지를 실제 디렉토리로 이동하는 로직
  @Post('move-image')
  async moveImage(
    @Body('imageId') imageId: number,
    @Body('imageUrl') imageUrl: string,
  ) {
    const tempPath = `./temp/${imageUrl.split('/').pop()}`;
    const uploadPath = `./uploads/${imageUrl.split('/').pop()}`;

    if (existsSync(tempPath)) {
      renameSync(tempPath, uploadPath); // 이미지 이동

      // 이동 후, DB의 이미지 URL을 업데이트
      const newUrl = `/uploads/${imageUrl.split('/').pop()}`;
      await this.commonService.updateImageDetailUrl(imageId, newUrl);

      return { message: 'Image moved and URL updated successfully', newUrl };
    } else {
      throw new BadRequestException('Image not found in temp directory');
    }
  }

  // 임시 저장된 이미지를 삭제하는 로직 (필요시 추가)
  @Post('delete-temp-image')
  async deleteTempImage(@Body('imageUrl') imageUrl: string) {
    const tempPath = `./temp/${imageUrl.split('/').pop()}`;

    if (existsSync(tempPath)) {
      unlinkSync(tempPath); // 임시 이미지 삭제
      return { message: 'Temporary image deleted successfully' };
    } else {
      throw new Error('Image not found in temp directory');
    }
  }
}
