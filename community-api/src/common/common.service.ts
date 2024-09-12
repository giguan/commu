import { ImageEntity } from '@entities/Image';
import { ImageDetailEntity } from '@entities/Image-detail';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
    @InjectRepository(ImageDetailEntity)
    private readonly imageDetailRepository: Repository<ImageDetailEntity>,
  ) {}

  // 이미지 엔티티 저장 로직 수정
  async saveImage(): Promise<ImageEntity> {
    const newImage = this.imageRepository.create(); // 메타데이터를 사용해 엔티티 생성
    return await this.imageRepository.save(newImage); // 생성한 엔티티를 DB에 저장
  }

  // 이미지 세부 정보 저장
  async saveImageDetails(
    image: ImageEntity,
    filename: string,
    url: string,
    orderNumber: number,
  ): Promise<ImageDetailEntity> {
    const imageDetail = this.imageDetailRepository.create({
      image,
      filename,
      url,
      orderNumber,
    });

    return await this.imageDetailRepository.save(imageDetail);
  }

  // 이미지 디테일 URL 업데이트
  async updateImageDetailUrl(imageId: number, newUrl: string): Promise<void> {
    await this.imageDetailRepository.update(
      { image: { id: imageId } },
      { url: newUrl },
    );
  }
}
