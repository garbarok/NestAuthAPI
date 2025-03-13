import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/user.repository';
import { BadRequestException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userData: CreateUserDTO): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const newUser = new User({
      id: uuid(),
      ...userData,
    });

    return this.userRepository.create(newUser);
  }
}
