import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from 'src/modules/auth/dtos/login.dto';
import { SignupDto } from 'src/modules/auth/dtos/signup.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup(signupDto: SignupDto) {
    return await this.usersService.create(signupDto);
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValidPassword = await this.usersService.validatePassword(
      loginDto.email,
      loginDto.password,
    );

    if (!isValidPassword)
      throw new UnauthorizedException('Invalid credentials');

    return user;
  }
}
