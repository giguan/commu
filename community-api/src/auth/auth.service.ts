import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findUser(username);

    console.log(user, password);

    // if (user && user.password === password) {
    //   // 비밀번호는 실제로 해싱하여 비교해야 함
    //   const { password, ...result } = user;
    //   return result;
    // }
    return null;
  }
}
