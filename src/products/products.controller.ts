import { Controller, Get, Post, Body, Patch, Delete, UsePipes, Param, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ZodValidationPipe } from 'src/common/pipes/zod.pipe';
import { addProductSchema } from './dto/add-product.dto';
import type { addProductDto } from './dto/add-product.dto';
import { updateProductSchema } from './dto/update-product.dto';
import type { updateProductDto } from './dto/update-product.dto';
import { deleteProductSchema } from './dto/delete-product.dto';
import type { deleteProductDto } from './dto/delete-product.dto';
import { fetchProductSchema } from './dto/fetch-product.dto';
import type { fetchProductDto } from './dto/fetch-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UsePipes(new ZodValidationPipe(addProductSchema))
  addProduct(
    @Body() addProductDto: addProductDto
  ) {
    return this.productsService.addProduct(addProductDto)
  }

  @Patch()
  @UsePipes(new ZodValidationPipe(updateProductSchema))
  updateProduct(
    @Body() updateProductDto: updateProductDto
  ) {
    return this.productsService.updateProduct(updateProductDto)
  }

  @Get()
  fetchProduct(
  ) {
    return this.productsService.fetchProduct()
  }

  @Get(':id')
  @UsePipes(new ZodValidationPipe(fetchProductSchema))
  fetchSingleProduct(
    @Param('id', ParseIntPipe) dto: fetchProductDto
  ) {
    return this.productsService.fetchSingleProduct(dto)
  }

  @Delete(':id')
  @UsePipes(new ZodValidationPipe(deleteProductSchema))
  deleteProduct(
    @Param('id', ParseIntPipe) dto: deleteProductDto
  ) {
    return this.productsService.deleteProduct(dto)
  }

}
