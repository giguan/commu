import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    // UsersModule
  ],
  providers: [AuthService, LocalStrategy, UserService],
  exports: [AuthModule],
})
export class AuthModule {}
