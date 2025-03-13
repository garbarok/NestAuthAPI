import { Injectable } from '@nestjs/common';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { User } from '@/domain/entities/User';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async createUser(userData: CreateUserDTO): Promise<User> {
    return this.createUserUseCase.execute(userData);
  }
}
