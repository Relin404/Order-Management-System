import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: any) {
    return await this.usersRepository.create(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne(id);
  }

  async update(id: number, updateUserDto: any) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async delete(id: number) {
    return await this.usersRepository.delete(id);
  }
}
