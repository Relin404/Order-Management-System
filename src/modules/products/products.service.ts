import { Injectable } from '@nestjs/common';
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
    return await this.productsRepository.findOne(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productsRepository.update(id, updateProductDto);
  }

  async delete(id: number) {
    return await this.productsRepository.delete(id);
  }
}
