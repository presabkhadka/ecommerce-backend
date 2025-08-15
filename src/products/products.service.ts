import { BadRequestException, Injectable } from '@nestjs/common';
import { addProductDto } from './dto/add-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateProductDto } from './dto/update-product.dto';
import { deleteProductDto } from './dto/delete-product.dto';
import type { fetchProductDto } from './dto/fetch-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async addProduct(dto: addProductDto) {

    const newProduct = await this.prismaService.products.create({
      data: dto
    })

    return {
      message: 'Product created successfully',
      data: newProduct
    }

  }

  async updateProduct(dto: updateProductDto) {

    const updatedProduct = await this.prismaService.products.updateMany({
      where: {
        name: dto.name
      },
      data: dto
    })

    return {
      message: 'Product updated successfully',
      data: updatedProduct
    }

  }

  async fetchProduct() {
    const fetchedProduct = await this.prismaService.products.findMany()
    return {
      message: 'Feched products',
      data: fetchedProduct
    }
  }

  async fetchSingleProduct(dto: fetchProductDto) {
    const fetchedProduct = await this.prismaService.products.findFirst({
      where: {
        id: dto
      }
    })
    return {
      message: 'Product fetched successfully',
      data: fetchedProduct
    }
  }

  async deleteProduct(dto: deleteProductDto) {

    const productExists = await this.prismaService.products.findFirst({
      where: {
        id: dto
      }
    })

    if (!productExists) {
      throw new BadRequestException('No such product found')
    }

    const deletedProduct = await this.prismaService.products.delete({
      where: {
        id: dto
      }
    })

    return {
      message: 'Product deleted successfully',
      data: deletedProduct
    }
  }

}
