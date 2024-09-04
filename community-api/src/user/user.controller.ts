import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
// import { NotloggedInGuard } from 'src/auth/not-logged-in.guard';
import { JoinRequestDto } from './dto/join.request.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('find')
  async getUser(@Body('id') id: string) {
    const res = await this.userService.findUser(id);
    return res;
  }

  @Post('id')
  async getUserIdCheck(@Body() id: string) {
    const res = await this.userService.findUserId(id);
    return res;
  }

  @Post('nickname')
  async getUserNicknameCheck(@Body() nickname: string) {
    const res = await this.userService.findUserNickname(nickname);
    return res;
  }

  @Post('signup')
  // @UseGuards(new NotloggedInGuard())
  async signup(@Body() body: JoinRequestDto): Promise<void> {
    await this.userService.postUser(
      body.id,
      body.email,
      body.nickname,
      body.password,
    );
  }
}
