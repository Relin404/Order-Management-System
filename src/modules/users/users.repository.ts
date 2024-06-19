import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  async create(createUserDto: any) {
    return await this.prismaClient.user.create({ data: createUserDto });
  }

  async findAll() {
    return await this.prismaClient.user.findMany();
  }

  async findOne(id: number) {
    return await this.prismaClient.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: any) {
    return await this.prismaClient.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async delete(id: number) {
    return await this.prismaClient.user.delete({ where: { id } });
  }
}
