import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../../../users/application/services/user.service';
import { CreateUserDto } from '../../../users/application/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async registerWithProvider(userData: {
    email: string;
    name: string;
    firstName: string;
    lastName: string;
  }) {
    let user = await this.userService.findByEmail(userData.email);

    if (!user) {
      const createUserDto: CreateUserDto = {
        email: userData.email,
        name: userData.name || `${userData.firstName} ${userData.lastName}`,
        password: Math.random().toString(36).slice(-8),
      };

      user = await this.userService.create(createUserDto);
    }

    return this.login(user);
  }
}
