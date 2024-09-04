// src/seed/board.seed.ts

console.log('??????????????');

import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { Board } from '@entities/Board'; // 경로 확인

export default class BoardSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@');
    const repository = dataSource.getRepository(Board);
    await repository.save([
      { name: '일반', description: '아무거나.' },
      { name: '뉴스', description: '뉴스 관련.' },
    ]);
    console.log('Board seeding completed');
  }
}
