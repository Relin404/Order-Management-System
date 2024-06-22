import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateUserDto } from 'src/modules/users/dtos/update-user.dto';
import { CreateUserDto } from 'src/modules/users/dtos/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(createUserDto.password);

    const user = await this.prismaClient.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });

    return user;
  }

  async findAll() {
    return await this.prismaClient.user.findMany();
  }

  async findOne(id: number) {
    return await this.prismaClient.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return await this.prismaClient.user.findUnique({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const hashedPassword = await this.hashPassword(updateUserDto.password);

    const user = await this.prismaClient.user.update({
      where: { id },
      data: {
        ...updateUserDto,
        password: hashedPassword,
      },
    });

    return user;
  }

  async delete(id: number) {
    return await this.prismaClient.user.delete({ where: { id } });
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, salt);
  }

  async validatePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
