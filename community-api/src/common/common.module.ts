import { Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageEntity } from '@entities/Image';
import { ImageDetailEntity } from '@entities/Image-detail';

@Module({
  imports: [TypeOrmModule.forFeature([ImageEntity, ImageDetailEntity])],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}
