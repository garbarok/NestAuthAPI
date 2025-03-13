import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from '@/application/services/user.service';
import { User } from '@/domain/entities/User';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDTO): Promise<User> {
    return this.userService.createUser(userData);
  }
}
