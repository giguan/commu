// src/seed/board.seed.ts

import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Board } from '../../entities/Board'; // 경로 확인
import { ExpRewardSettings } from '../../entities/ExpRewardSettings';

export default class BoardSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const boardRepository = dataSource.getRepository(Board);

    // 데이터 삽입
    await boardRepository.insert([
      { id: 1, name: '전체', description: 'all', order: 0 },
      { id: 2, name: '일반', description: '아무거나', order: 1 },
      { id: 3, name: '뉴스', description: '뉴스 관련', order: 1 },
    ]);

    // 이거 아래꺼 시딩하고 있었음

    const expRewardSettings = dataSource.getRepository(ExpRewardSettings);

    // 기본 보상 설정 값들 시딩
    await expRewardSettings.save({
      postPoints: 10,
      commentPoints: 5,
      postExp: 20,
      commentExp: 10,
    });
  }
}
