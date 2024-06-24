import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from 'src/modules/products/dtos/create-product.dto';
import { UpdateProductDto } from 'src/modules/products/dtos/update-product.dto';
import { ProductsService } from 'src/modules/products/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Create product', operationId: 'create' })
  @ApiBody({ type: CreateProductDto, description: 'Product data' })
  @ApiResponse({ status: 201, description: 'Product created' })
  @ApiConflictResponse({ description: 'Product already exists' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Find all products', operationId: 'findAll' })
  @ApiResponse({ status: 200, description: 'Products found' })
  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @ApiOperation({ summary: 'Find product by ID', operationId: 'findOne' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Product found' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.findOne(id);
  }

  @ApiOperation({ summary: 'Update product', operationId: 'update' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateProductDto, description: 'Product data' })
  @ApiResponse({ status: 200, description: 'Product updated' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete product', operationId: 'delete' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({ status: 200, description: 'Product deleted' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.delete(id);
  }
}
