import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { addProductDto } from './dto/add-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { updateProductDto } from './dto/update-product.dto';
import { deleteProductDto } from './dto/delete-product.dto';
import type { fetchProductDto } from './dto/fetch-product.dto';
import type { addStockDto } from './dto/add-stock.dto';

@Injectable()
export class ProductsService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  // for adding product
  async addProduct(dto: addProductDto) {
    const newProduct = await this.prismaService.products.create({
      data: dto
    })

    return {
      message: 'Product created successfully',
      data: newProduct
    }

  }

  // for updating the product
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

  // for fetching the product 
  async fetchProduct() {
    const fetchedProduct = await this.prismaService.products.findMany()
    return {
      message: 'Feched products',
      data: fetchedProduct
    }
  }

  // for fetching a single product
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

  // for deleting the product
  async deleteProduct(dto: deleteProductDto) {
    await this.prismaService.products.findUniqueOrThrow({
      where: {
        id: dto
      }
    })

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

  // for adding product stock
  async addStock(id: number, dto: addStockDto) {
    await this.prismaService.products.findUniqueOrThrow({
      where: {
        id: id
      }
    })

    const addStock = await this.prismaService.products.update({
      where: {
        id: id
      },
      data: {
        stock: {
          increment: dto.stock
        }
      }
    })

    return {
      message: 'Stock added successfully',
      data: addStock
    }
  }
}
