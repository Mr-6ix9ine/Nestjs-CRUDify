import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findOneByUsername(username: string): Promise<User | null> {
    return this.userModel.findOne({ where: { username } });
  }

  async createUser(username: string, password: string): Promise<User> {
    return this.userModel.create({ username, password });
  }
}
