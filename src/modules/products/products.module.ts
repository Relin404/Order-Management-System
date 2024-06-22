import { Module } from '@nestjs/common';
import { ProductsController } from 'src/modules/products/products.controller';
import { ProductsRepository } from 'src/modules/products/products.repository';
import { ProductsService } from 'src/modules/products/products.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsRepository],
})
export class ProductsModule {}
