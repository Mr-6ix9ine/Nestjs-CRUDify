import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body(new ValidationPipe()) createProductDto: CreateProductDto,
  ) {
    const generatedId =
      await this.productsService.insertProduct(createProductDto);
    return { id: generatedId };
  }

  @Get()
  async getAllProducts() {
    return await this.productsService.getProducts();
  }

  @Get(':id')
  async getProduct(@Param('id') prodId: string) {
    return await this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body(new ValidationPipe()) updateProductDto: Partial<CreateProductDto>,
  ) {
    await this.productsService.updateProduct(prodId, updateProductDto);
    return null;
  }

  @Delete(':id')
  async removeProduct(@Param('id') prodId: string) {
    await this.productsService.deleteProduct(prodId);
    return null;
  }
}
