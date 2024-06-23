import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from 'src/modules/products/dtos/create-product.dto';
import { UpdateProductDto } from 'src/modules/products/dtos/update-product.dto';
import { ProductsRepository } from 'src/modules/products/products.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productsRepository.create(createProductDto);
  }

  async findAll() {
    return await this.productsRepository.findAll();
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne(id);

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productsRepository.update(id, updateProductDto);

    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async delete(id: number) {
    const product = await this.productsRepository.delete(id);

    return product;
  }
}
