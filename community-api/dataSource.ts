import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from './src/entities/User';
import { Post } from './src/entities/Post';
import { Board } from './src/entities/Board';
import { Comment } from './src/entities/Comment';
import { runSeeders } from 'typeorm-extension';
import { ExpRewardSettings } from './src/entities/ExpRewardSettings';

dotenv.config();

const dataSource = new DataSource({
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Post, Board, Comment, ExpRewardSettings],
  migrations: [__dirname + '/migrations/*.ts'],
  //migrationsRun: true,
  synchronize: false,
  logging: true,
  charset: 'utf8mb4_general_ci',
});

dataSource.initialize().then(async () => {
  await runSeeders(dataSource);
});

// async function seedDatabase() {
//   try {
//     console.log('Initializing DataSource...');
//     await dataSource.initialize();

//     console.log('Running seeders...');
//     await runSeeders(dataSource, {
//       seeds: [BoardSeeder], // 여기서 Seeder 지정
//     });

//     console.log('Seeding completed');
//   } catch (error) {
//     console.error('Seeding failed:', error);
//   } finally {
//     await dataSource.destroy();
//   }
// }

// seedDatabase();

export default dataSource;
