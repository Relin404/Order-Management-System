import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateProductDto } from 'src/modules/products/dtos/create-product.dto';
import { UpdateProductDto } from 'src/modules/products/dtos/update-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(private readonly prismaClient: PrismaService) {}

  async create(createproductDto: CreateProductDto) {
    let product;

    try {
      product = await this.prismaClient.product.create({
        data: createproductDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Product already exists');
      }

      throw error;
    }

    return product;
  }

  async findAll() {
    return await this.prismaClient.product.findMany();
  }

  async findOne(id: number) {
    return await this.prismaClient.product.findUnique({ where: { id } });
  }

  async update(id: number, updateproductDto: UpdateProductDto) {
    return await this.prismaClient.product.update({
      where: { id },
      data: updateproductDto,
    });
  }

  async delete(id: number) {
    return await this.prismaClient.product.delete({ where: { id } });
  }
}
