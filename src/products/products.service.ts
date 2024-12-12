import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
  ) {}

  async insertProduct(createProductDto: CreateProductDto): Promise<string> {
    const product = await this.productModel.create(createProductDto);
    return product.id;
  }

  async getProducts(): Promise<Product[]> {
    return this.productModel.findAll();
  }

  async getSingleProduct(productId: string): Promise<Product> {
    const product = await this.productModel.findByPk(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async updateProduct(
    productId: string,
    updateProductDto: Partial<CreateProductDto>,
  ): Promise<void> {
    const product = await this.getSingleProduct(productId);
    await product.update(updateProductDto);
  }

  async deleteProduct(productId: string): Promise<void> {
    const product = this.getSingleProduct(productId);
    (await product).destroy();
  }
}
