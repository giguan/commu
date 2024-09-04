// src/seed/board.seed.ts

import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Board } from '../../entities/Board'; // 경로 확인

export default class BoardSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const boardRepository = dataSource.getRepository(Board);

    // 데이터 삽입
    await boardRepository.insert([
      { id: 1, name: '일반', description: '아무거나' },
      { id: 2, name: '뉴스', description: '뉴스 관련' },
    ]);
  }
}
