import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUser(id: string) {
    console.log(`${id} : id`);

    return await this.userRepository.findOne({
      where: { id: id },
    });
  }

  async findUserId(id: string) {
    return await this.userRepository.count({
      where: { id: id },
    });
  }

  async findUserNickname(nickname: string) {
    return await this.userRepository.count({
      where: { nickname: nickname },
    });
  }

  async postUser(
    id: string,
    email: string,
    nickname: string,
    password: string,
  ) {
    console.log('@@@@@@@@@', password);

    // const hashedPassword = await bcrypt.hash(password, 10);
    // front단에서 hash해서 보내버림
    const user = this.userRepository.create({
      id,
      email,
      nickname,
      password,
    });

    console.log(user);

    await this.userRepository.save(user);
  }
}
