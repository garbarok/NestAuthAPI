import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async create(user: User): Promise<User> {
    const userEntity = this.toEntity(user);
    const savedEntity = await this.userRepo.save(userEntity);
    return this.mapToDomain(savedEntity);
  }

  private toEntity(user: User): UserEntity {
    const entity = new UserEntity();
    entity.email = user.email;
    entity.name = user.name;
    entity.password = user.password;
    return entity;
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.userRepo.findOneBy({ email });
    return entity ? this.mapToDomain(entity) : null;
  }

  private mapToDomain(entity: UserEntity): User {
    return new User({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      password: entity.password,
    });
  }
}
