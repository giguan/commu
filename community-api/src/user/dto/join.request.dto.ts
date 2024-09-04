import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class JoinRequestDto {
  @IsString()
  @IsNotEmpty()
  public id: string;

  @IsEmail()
  @IsNotEmpty()
  public password: string;

  @IsString()
  @IsNotEmpty()
  public nickname: string;

  @IsString()
  @IsNotEmpty()
  public email: string;
}
